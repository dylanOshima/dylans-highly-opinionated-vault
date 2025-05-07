/**
 * Returns a list of all the project folders as suggestions, e.g. folders inside: `Projects/`.
 */

const SCRIPTS_UTIL_PATH = '/Scripts/utils';

module.exports = async function listProjectAreas(params) {
  const {app, obsidian} = params;
  const {vault} = app;

  const utils = require(app.vault.adapter.basePath + SCRIPTS_UTIL_PATH);
  const files = utils.getAllProjectAreas(obsidian, vault);

  // Display files to select
  const areasDisplay = await params.quickAddApi.suggester(
      (files) => files.name,
      files
  );

  // Check if user cancelled
  if(!areasDisplay) {
    return;
  }

  // Pass selected area's path to areas variable
  params.variables = { area: areasDisplay.path };
}
