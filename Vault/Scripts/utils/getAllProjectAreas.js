/**
 * utils/getAllProjectAreas.js
 *
 * Fetches all project files
 */

// The folder that holds all project areas
const ROOT_PROJECTS_FOLDER_NAME = "Projects";
// Project areas to exclude
const EXCLUDED_AREA = "Archive";

/**
 * @param obsidian the obsidian object model
 * @param vault the obsidian object model
 * @return TAbstractFile[] the project area folders
 */
module.exports = function getAllProjectAreas(obsidian, vault) {
  const paraRoot = vault.getRoot().children.filter(
    file => file.name === ROOT_PROJECTS_FOLDER_NAME
  )[0];

  if(!paraRoot) {
    return;
  }

  // Search for files that match fileType parameters
  const files = paraRoot.children
      .filter(file =>
        !file.deleted
        && file instanceof obsidian.TFolder
        &&file.name !== EXCLUDED_AREA
      )
      //Sort by Folder
      .sort((a,b) => a.parent.path.localeCompare(b.parent.path));
  return files;
}
