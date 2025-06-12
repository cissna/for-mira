// DOM manipulation utilities

/**
 * Safely update element text content
 * @param {string} elementId - Element ID
 * @param {string} text - Text to set
 */
export function updateElementText(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = text;
  }
}

/**
 * Show loading state for an element
 * @param {string} elementId - Element ID
 * @param {string} [loadingText] - Custom loading text
 */
export function showLoading(elementId, loadingText = '…sending') {
  updateElementText(elementId, loadingText);
}

/**
 * Hide loading state (clear element)
 * @param {string} elementId - Element ID
 */
export function hideLoading(elementId) {
  updateElementText(elementId, '');
}

/**
 * Display error message in element
 * @param {string} elementId - Element ID
 * @param {string} message - Error message
 */
export function displayError(elementId, message) {
  updateElementText(elementId, '🚫 ' + message);
}

/**
 * Display success message in element
 * @param {string} elementId - Element ID
 * @param {string} message - Success message
 */
export function displaySuccess(elementId, message) {
  updateElementText(elementId, message);
}

/**
 * Add CSS class to element
 * @param {string} elementId - Element ID
 * @param {string} className - CSS class name
 */
export function addClass(elementId, className) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add(className);
  }
}

/**
 * Remove CSS class from element
 * @param {string} elementId - Element ID
 * @param {string} className - CSS class name
 */
export function removeClass(elementId, className) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.remove(className);
  }
}