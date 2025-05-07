/**
 * index.js
 *
 * Various utils.
 *
 * HOW TO ACCESS:
 *   1. The object is initialized in the `Templates/Root.md` file
 *   2. It is stored in `app.utils`
 *   3. Access:
 *      [DV] Access via `dv.app.utils`
 *      [Templater] Access via `this.app.utils`
 */


module.exports = {
  getAllProjectAreas: require('./getAllProjectAreas'),
  getContentUnderHeader: require('./getContentUnderHeader'),
};
