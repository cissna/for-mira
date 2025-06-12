const STORAGE_KEY = 'chosenUser';

export function setUser(u) {
  localStorage.setItem(STORAGE_KEY, u);
}

export function getUser() {
  return localStorage.getItem(STORAGE_KEY) || '';
}

export function collectForm(form) {
  const formData = new FormData(form);
  const data = {};

  for (const [key, value] of formData.entries()) {
    if (data.hasOwnProperty(key)) {
      if (Array.isArray(data[key])) {
        data[key].push(value);
      } else {
        data[key] = [data[key], value];
      }
    } else {
      data[key] = value;
    }
  }

  data.user = getUser();
  return data;
}

// New homepage functionality
document.addEventListener('DOMContentLoaded', () => {
  // Modal management
  const modal = document.getElementById('login-modal');
  const closeBtn = document.querySelector('.modal-close');
  
  // Project button handlers
  const hazardBtn = document.getElementById('hazard-warning-btn');
  if (hazardBtn) {
    hazardBtn.addEventListener('click', () => {
      showLoginModal();
    });
  }
  
  // Login button handlers
  const isaacBtn = document.getElementById('btn-isaac');
  const miraBtn = document.getElementById('btn-mira');
  
  if (isaacBtn) {
    isaacBtn.addEventListener('click', () => {
      setUser('isaac');
      hideLoginModal();
      window.location.href = 'hazardous';
    });
  }
  
  if (miraBtn) {
    miraBtn.addEventListener('click', () => {
      setUser('mira');
      hideLoginModal();
      window.location.href = 'hazardous';
    });
  }
  
  // Modal close handlers
  if (closeBtn) {
    closeBtn.addEventListener('click', hideLoginModal);
  }
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideLoginModal();
      }
    });
  }
  
  // API functionality
  const apiSubmitBtn = document.getElementById('api-submit-btn');
  const apiInput = document.getElementById('api-input');
  const apiResponse = document.getElementById('api-response');
  
  if (apiSubmitBtn && apiInput && apiResponse) {
    apiSubmitBtn.addEventListener('click', async () => {
      const inputText = apiInput.value.trim();
      if (!inputText) {
        alert('Please enter some text first');
        return;
      }
      
      await submitToAPI(inputText, apiResponse);
    });
  }
});

function showLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function hideLoginModal() {
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// API Integration
async function submitToAPI(textInput, responseElement) {
  const API_ENDPOINT = 'https://your-api-endpoint.com/process'; // Placeholder endpoint
  
  responseElement.textContent = 'Submitting...';
  responseElement.classList.add('visible');
  
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        input: textInput,
        timestamp: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    responseElement.textContent = `Success!\nResponse: ${JSON.stringify(result, null, 2)}`;
    
  } catch (error) {
    responseElement.textContent = `Error: ${error.message}\n\nNote: This is a placeholder endpoint. Replace with your actual API URL.`;
  }
}
