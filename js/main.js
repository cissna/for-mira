// Import modular services and utilities
import { setUser, getUser } from './services/userService.js';
import { collectForm } from './utils/formUtils.js';
import { sendToIsaac } from './services/twilioService.js';
import { showModal, hideModal } from './components/modalManager.js';
import { addClass } from './utils/domUtils.js';

// Export functions for backward compatibility with hazardous page
export { setUser, getUser, collectForm };

// New homepage functionality
document.addEventListener('DOMContentLoaded', () => {
  // Modal management
  const modal = document.getElementById('login-modal');
  const closeBtn = document.querySelector('.modal-close');
  
  // Project button handlers
  const hazardBtn = document.getElementById('hazard-warning-btn');
  if (hazardBtn) {
    hazardBtn.addEventListener('click', () => {
      showModal('login-modal');
    });
  }
  
  // Login button handlers
  const isaacBtn = document.getElementById('btn-isaac');
  const miraBtn = document.getElementById('btn-mira');
  
  if (isaacBtn) {
    isaacBtn.addEventListener('click', () => {
      setUser('isaac');
      hideModal('login-modal');
      window.location.href = 'hazardous';
    });
  }
  
  if (miraBtn) {
    miraBtn.addEventListener('click', () => {
      setUser('mira');
      hideModal('login-modal');
      window.location.href = 'hazardous';
    });
  }
  
  // Modal close handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', () => hideModal('login-modal'));
  }
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideModal('login-modal');
      }
    });
  }
  
  // API functionality
  const apiSubmitBtn = document.getElementById('suggestions-submit-btn');
  const apiInput = document.getElementById('suggestions-input');
  const apiResponse = document.getElementById('suggestions-response');
  
  if (apiSubmitBtn && apiInput && apiResponse) {
    apiSubmitBtn.addEventListener('click', async () => {
      const inputText = apiInput.value.trim();
      if (!inputText) {
        alert('Please enter some text first');
        return;
      }
      
      await submitSuggestionToTwilio(inputText, apiResponse);
    });
  }
});

// Twilio Integration for Suggestions
async function submitSuggestionToTwilio(textInput, responseElement) {
  responseElement.textContent = 'Submitting...';
  addClass('suggestions-response', 'visible');
  
  try {
    // Build simple message for suggestion
    const message = `New suggestion from Mira:\n${textInput}`
    
    // Send to Isaac via Twilio
    const response = await sendToIsaac(message);
    responseElement.textContent = response;
    
  } catch (error) {
    responseElement.textContent = `Error: ${error.message}`;
  }
}
