---
tags:
  - monthly
---
# <% moment(tp.file.title, "YYYY-MM").format("YYYY MMMM") %>
<< [[<% moment(tp.file.title, "YYYY-MM").subtract(1, "months").format("YYYY-MM") %>|<%moment(tp.file.title, "YYYY-MM").subtract(1, "months").format("MMM") %>]] | [[<% moment(tp.file.title, "YYYY-MM").format("YYYY")-%>|<% moment(tp.file.title, "YYYY-MM").format("YYYY")-%>]] | [[<% moment(tp.file.title, "YYYY-MM").add(1, "months").format("YYYY-MM") %>|<%moment(tp.file.title, "YYYY-MM").add(1, "months").format("MMM")%>]] >>
## Tracking

## Completed
```dataview
TASK
FROM #daily
WHERE fullyCompleted
	AND file.name != this.file.name
	AND !contains(file.path, "Templates")
	AND date(file.name).year = date(this.file.name).year
	AND date(file.name).month = date(this.file.name).month
GROUP BY date(file.name).week
SORT created ASC
```
## Incomplete
```dataview
TASK
FROM #daily
WHERE !fullyCompleted
	AND file.name != this.file.name
	AND !contains(file.path, "Templates")
	AND date(file.name).year = date(this.file.name).year
	AND date(file.name).month = date(this.file.name).month
GROUP BY date(file.name).week
SORT created ASC
```
<%*
async function getDVForContentUnderHeading(heading) {
	const thisMoment = moment(tp.file.title);
	const headerLevel = 2;
	return `
\`\`\`dataviewjs
const {getContentUnderHeader} = require(app.vault.adapter.basePath + '/Scripts/utils');
const pages = dv.pages('#daily').where(
	p =>  p.file.name != dv.current().file.name
		&& moment(p.file.name).month() === ${thisMoment.month()}
		&& moment(p.file.name).year() === ${thisMoment.year()}
).map(async page => {
	const content = await dv.io.load(page.file.path);
	const output = await getContentUnderHeader(content, "${heading}", ${headerLevel});
	return {
		fileName: page.file.name,
		output,
	};
});
const headerContent = (await Promise.all(pages))
	.filter(content => content.output.length > 0)
for(const fileContent of headerContent) {
	const {fileName, output} = fileContent;
	// Displaying the file name
	dv.header(${headerLevel + 1}, dv.fileLink(fileName));
	dv.paragraph(output.join('\\n'));
}
\`\`\`
	`.trim();
}
%>
## Learnings
<%* tR += await getDVForContentUnderHeading("Learnings") %>
## Thoughts
<%* tR += await getDVForContentUnderHeading("Thoughts") %>
## Artifacts
<%* tR += await getDVForContentUnderHeading("Artifacts") %>
