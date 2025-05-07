/**
 * Generates check-in tasks for projects that need to be checked in.
 */
module.exports = async function getProjectCheckInTasks(tp) {
  const dv = app.plugins.plugins.dataview.api;
  let output = "";
  try {
    const projectPages = await dv.pages("#project")
    for(let page of projectPages) {
      if(
        page?.path?.file?.path?.contains("Templates/")
        || page?.status !== "In-Progress"
      ) {
        continue;
      }
      const projectTag = page.file.name.replace(/ /g, "-").toLowerCase();
      const lastCheckInDate = (await dv.pages("#daily AND #check-in-task")).values
        ?.filter(f =>
          !f.file.path.contains("Templates/")
          && f.file.tasks.where(t => t.project == projectTag).length > 0
        )?.map(f => dv.date(f.file.name))
        ?.sort((d1, d2) => d1 - d2)
        ?.[0];
      if(lastCheckInDate != null) {
        const fileDate = new Date(tp.file.title);
        const checkInFrequency = page['check-in-frequency'];
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const daysSinceLastCheckIn = Math.round((fileDate - lastCheckInDate) / millisecondsPerDay);
          if(daysSinceLastCheckIn < checkInFrequency) {
            continue;
          }
      }
      output += `- [ ] Check-in to [[${page.file.name}]] #check-in-task (project::${projectTag})\n`;
    }
  } catch(e) {
    output += `*Failed to fetch project check-ins.*\n`
  }
  return output;
}
