const { httpGet } = require('./mock-http-interface');

/**
 * Fetches and formats quotes from multiple URLs in parallel.
 * 
 * @param {string[]} urls - An array of URLs to fetch quotes from
 * @returns {Promise<Array>} - A promise that resolves to an array of quote or failure objects
 */
const getArnieQuotes = async (urls) => 
  Promise.all(urls.map(fetchAndFormatQuote)); // Execute all requests concurrently and preserve order

/**
 * Performs an HTTP GET request and formats the result according to status.
 * 
 * If status === 200: returns { 'Arnie Quote': message }
 * Else: returns { FAILURE: message }
 * Also handles unexpected errors gracefully.
 * 
 * @param {string} url - The URL to request
 * @returns {Promise<Object>} - A formatted response object
 */
const fetchAndFormatQuote = async (url) => {
  try {
    const { status, body } = await httpGet(url); // Use provided HTTP mock
    const parsed = JSON.parse(body); // Parse the JSON body

    if (status === 200) {
      return { 'Arnie Quote': parsed.message }; // On success, return formatted quote
    } else {
      return { FAILURE: parsed.message }; // On handled failure, return error object
    }
  } catch (err) {
    // On unexpected errors (e.g., malformed body, network issues), return a safe failure format
    return { FAILURE: err.message || 'Unexpected error' };
  }
};

module.exports = {
  getArnieQuotes,
};
