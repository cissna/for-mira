// Configuration constants

export const CONFIG = {
  // API Endpoints
  TWILIO_ENDPOINT: 'https://backend-5491.twil.io/main',
  
  // User Configuration
  USERS: {
    ISAAC: 'isaac',
    MIRA: 'mira'
  },
  
  // Storage Keys
  STORAGE_KEYS: {
    CHOSEN_USER: 'chosenUser'
  },
  
  // Message Templates
  MESSAGES: {
    LOADING: '…sending',
    SUCCESS_PREFIX: '',
    ERROR_PREFIX: '🚫 '
  },
  
  // Form Validation Rules
  VALIDATION: {
    SUGGESTIONS: {
      required: ['input']
    },
    HAZARDOUS_WARNING: {
      required: ['reason']
    }
  },
  
  // Error Messages
  ERRORS: {
    NETWORK_ERROR: 'Network error occurred. Please try again.',
    VALIDATION_ERROR: 'Please fill in all required fields.',
    UNKNOWN_USER: 'Unknown user specified.',
    TWILIO_ERROR: 'Failed to send message. Please try again.',
    EMPTY_INPUT: 'Please enter some text first.'
  },
  
  // Modal Configuration
  MODALS: {
    LOGIN_MODAL: 'login-modal'
  },
  
  // CSS Classes
  CSS_CLASSES: {
    HIDDEN: 'hidden',
    VISIBLE: 'visible'
  }
};

// Helper functions for configuration
export function getOppositeUser(username) {
  if (username === CONFIG.USERS.ISAAC) return CONFIG.USERS.MIRA;
  if (username === CONFIG.USERS.MIRA) return CONFIG.USERS.ISAAC;
  throw new Error(CONFIG.ERRORS.UNKNOWN_USER);
}

export function isValidUser(username) {
  return Object.values(CONFIG.USERS).includes(username);
}