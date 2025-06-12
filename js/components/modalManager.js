// Modal management component

/**
 * Show a modal by removing the 'hidden' class
 * @param {string} modalId - Modal element ID
 */
export function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
  }
}

/**
 * Hide a modal by adding the 'hidden' class
 * @param {string} modalId - Modal element ID
 */
export function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
  }
}

/**
 * Initialize modal with event listeners
 * @param {string} modalId - Modal element ID
 * @param {Object} config - Configuration object
 * @param {string} config.closeButtonSelector - Selector for close button
 * @param {Function} config.onClose - Optional callback when modal closes
 */
export function initializeModal(modalId, config = {}) {
  const modal = document.getElementById(modalId);
  if (!modal) return;

  const closeBtn = config.closeButtonSelector ? 
    modal.querySelector(config.closeButtonSelector) : 
    modal.querySelector('.modal-close');

  // Close button handler
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      hideModal(modalId);
      if (config.onClose) config.onClose();
    });
  }

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      hideModal(modalId);
      if (config.onClose) config.onClose();
    }
  });
}

/**
 * Handle modal click events (for delegation)
 * @param {Event} event - Click event
 * @param {string} modalId - Modal element ID
 */
export function handleModalClick(event, modalId) {
  const modal = document.getElementById(modalId);
  if (event.target === modal) {
    hideModal(modalId);
  }
}