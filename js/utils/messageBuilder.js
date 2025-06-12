// Message construction utilities

/**
 * Build the hazardous warning message for Twilio
 * @param {Object} payload - form data as returned by collectForm
 * @returns {string}
 */
export function buildHazardousWarningMessage(payload) {
  let body = "YOU ARE RECEIVING A WARNING FROM YOUR SPOUSE.\nThey are in a potentially hazardous mood today, according to them because of\n";

  // Normalize reasons to an array
  let reasons = payload.reason;
  if (!Array.isArray(reasons)) reasons = reasons ? [reasons] : [];

  // If "all" selected, use every reason
  if (reasons.includes('all')) {
    reasons = [
      "Something you did",
      "Something outside of your control",
      "Something you didn’t do",
      "Something you did in a dream"
    ];
  }

  // Append each reason
  reasons.forEach(r => {
    body += `- ${r}\n`;
  });

  body += 'Please be cautious and keep your distance and/or purchase gifts.';

  // Additional instructions if provided
  if (payload.further) {
    body += `\n\nFURTHER INSTRUCTIONS:\n${payload.further}`;
  }

  return body;
}

/**
 * Build a simple message (e.g. for suggestions)
 * @param {string} text - The main text input (suggestion)
 * @returns {string}
 */
