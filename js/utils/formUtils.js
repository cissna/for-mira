// Form handling utilities

import { getUser } from '../services/userService.js';

/**
 * Collect form data and convert to object
 * @param {HTMLFormElement} form - The form element
 * @returns {Object} - Form data object with user included
 */
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

/**
 * Sanitize text input by trimming and basic cleanup
 * @param {string} input - Raw input text
 * @returns {string} - Sanitized input
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.trim();
}

/**
 * Validate form data against basic rules
 * @param {Object} data - Form data object
 * @param {Object} rules - Validation rules
 * @returns {boolean} - True if valid
 */
export function validateFormData(data, rules = {}) {
  // Basic validation - can be extended as needed
  if (rules.required) {
    for (const field of rules.required) {
      if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Get validation errors for form data
 * @param {Object} data - Form data object
 * @param {Object} rules - Validation rules
 * @returns {Array} - Array of error messages
 */
export function getFormErrors(data, rules = {}) {
  const errors = [];
  
  if (rules.required) {
    for (const field of rules.required) {
      if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
        errors.push(`${field} is required`);
      }
    }
  }
  
  return errors;
}