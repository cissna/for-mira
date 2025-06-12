// User management & localStorage service

const STORAGE_KEY = 'chosenUser';
const KNOWN_USERS = ['isaac', 'mira'];

/**
 * Set the current user in localStorage
 * @param {string} username
 */
export function setUser(username) {
  if (!validateUser(username)) throw new Error("Unknown user: " + username);
  localStorage.setItem(STORAGE_KEY, username);
}

/**
 * Get the current user from localStorage
 * @returns {string}
 */
export function getUser() {
  const user = localStorage.getItem(STORAGE_KEY) || '';
  return user;
}

/**
 * Get the opposite user (for spouse messaging)
 * @param {string} username
 * @returns {string}
 */
export function getOppositeUser(username) {
  if (username === "isaac") return "mira";
  if (username === "mira") return "isaac";
  throw new Error("Unknown user: " + username);
}

/**
 * Validate if a username is a known user
 * @param {string} username
 * @returns {boolean}
 */
export function validateUser(username) {
  return KNOWN_USERS.includes(username);
}