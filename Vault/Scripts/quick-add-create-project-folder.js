
// Template for the new project index file
const getProjectIndexTemplate = (projectFolderPath, projectTag) => `---
tags:
  - project
role:
deadline:
check-in frequency: 14
status:
---
> [!tldr] TL;DR
> *What is the project about?*

> [!important] Goal
> *What is the goal of this project?*

## Tasks
\`\`\`dataview
TASK
WHERE project = "${projectTag}"
	AND !fullyCompleted
	AND file.path != this.file.path
	AND contains(text, "${projectTag}")
\`\`\`

### Check-Ins
\`\`\`dataview
LIST
FROM #daily AND #check-in-task
WHERE any(file.tasks, (t) => t.project = "${projectTag}" AND contains(t.tags, "#check-in-task"))
\`\`\`

## Contributors
- *Who's working on this project?*

## [[${projectFolderPath}/Artifacts/Artifacts#Artifacts|Artifacts]]
### Completed Tasks
\`\`\`dataview
TASK
WHERE project = "${projectTag}" AND fullyCompleted
\`\`\`\n`;

const getProjectArtifactsTemplate = ({
  projectName,
  artifactsFolderPath,
  projectTag
}) => `---
aliases:
tags: [projects, ${projectTag}]
---\n\n
## Documents\n
## Artifacts
\`\`\`dataview
LIST
FROM "${artifactsFolderPath}"
WHERE file.name != this.file.name
\`\`\`
## [[${projectName}|${projectName}]]
\n\n`;

module.exports = async function createProject(params) {
  const targetProjectFolder = params.variables.area;
  // No project folder selected
  if(!targetProjectFolder) {
    return;
  }
  // Get the project name
  const userInput = await params.quickAddApi.inputPrompt(
    "CREATE a new Project",
    "Project Name"
  );
  // Check if user cancelled
  if (!userInput) {
    return;
  }

  const absolutePath = `${targetProjectFolder}/${userInput}`;
  const artifactsFolderPath = `${absolutePath}/Artifacts`;
  const projectTag = userInput.replace(/ /g, "-").toLowerCase();

  // Create a new folder
  await params.app.vault.createFolder(`${absolutePath}`);

  // Create a new file in the new folder
  const newFile = await params.app.vault.create(
    `${absolutePath}/${userInput}.md`,
    getProjectIndexTemplate(absolutePath, projectTag)
  );

  // Create artifacts folder and file
  await params.app.vault.createFolder(artifactsFolderPath);
  await params.app.vault.create(
    `${artifactsFolderPath}/Artifacts.md`,
    getProjectArtifactsTemplate({
      projectName: userInput,
      artifactsFolderPath,
      projectTag
    })
  );
};
