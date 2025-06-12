// Core Twilio API integration module

// Twilio endpoint configuration (later to move to config if needed)
const TWILIO_ENDPOINT = "https://backend-5491.twil.io/main";

/**
 * Send a message via Twilio API
 * @param {string} receiver - recipient username (e.g. "isaac" or "mira")
 * @param {string} body - message content
 * @param {string} [endpoint] - optional override for endpoint
 * @returns {Promise<string>} - Server response text
 */
export async function sendTwilioMessage(receiver, body, endpoint = TWILIO_ENDPOINT) {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ receiver, body })
    });
    if (!res.ok) {
      throw new Error("HTTP error! Status: " + res.status);
    }
    return await res.text();
  } catch (err) {
    throw new Error("Twilio send failed: " + err.message);
  }
}

/**
 * Send a hazardous warning to the spouse (receiver is the OTHER user)
 * @param {string} body - warning message body
 * @param {string} currentUser - sender username ("isaac" or "mira")
 */
export async function sendToSpouse(body, currentUser) {
  const receiver = currentUser === "isaac" ? "mira" : "isaac";
  return await sendTwilioMessage(receiver, body);
}

/**
 * Send a message directly to Isaac (for suggestions)
 * @param {string} body - message content
 */
export async function sendToIsaac(body) {
  return await sendTwilioMessage('isaac', body);
}