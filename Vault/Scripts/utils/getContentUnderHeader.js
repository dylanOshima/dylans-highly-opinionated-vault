/**
 * utils/getContentUnderHeader.js
 *
 * Fetches all content under a given header
 */

/**
 * @param {string} content the content of a given file
 * @param {string} headerName the name of the header to search for
 * @param {number} headerLevel the header level to search under (e.g. 1 for H1, 2 for H2, etc.)
 * @return {Array<string>} An array of the content under the header or null
 */
module.exports = async function getContentUnderHeader(content, headerName, headerLevel) {
  const prefix = "#".repeat(headerLevel);
  const lines = content.split('\n');
  const output = [];
  let insideHead = false;
  for (const line of lines) {
      if (line.startsWith(`${prefix} ${headerName}`)) {
          insideHead = true;
      } else if (line.startsWith(prefix) && insideHead) {
          insideHead = false;
          break;  // Exit the loop when the next heading is encountered
      } else if (insideHead) {
          output.push(line);
      }
  }
  // Filter out empty lines
  return output.filter(line => line.trim() !== '');
}
