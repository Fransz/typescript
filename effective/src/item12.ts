/**
 * Item 12: Apply Types to Entire Function Expressions When Possible
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Een fetch die een error throwed.
 * Het type is hetzelfde als fetch; Er volgt een type fout als je ipv het throw statement abusievelijk een throw
 * gebruikt.
 * @param {RequestInfo| URL} input - Where to fetch from
 * @param {RequestInit| undefined} init - Fetch parameters
 * @returns {Promise<Response>} - The Response in a promise
 */
const checkedFetch: typeof fetch = async (input, init) => {
  const response = await fetch(input, init);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response;
};

/**
 * Een fetch die een nummer levert.
 * @param {[ RequestInfo | URL,RequestInit | undefined ]} args - parameters voor fetch
 * @returns {Promise<number>} - The number in a promise
 */
async function checkedNumberFetch(...args: Parameters<typeof fetch>) {
  const response = await checkedFetch(...args);
  const n = Number(await response.text());
  if (isNaN(n)) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return n;
}
