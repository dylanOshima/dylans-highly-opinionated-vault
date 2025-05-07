---
tags:
  - daily
---
## [[<% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-MM") %> | <% moment(tp.file.title, "YYYY-MM-DD").format("MMMM") %>]] <% moment(tp.file.title, "YYYY-MM-DD").format("Do, YYYY") %>
<< [[<% moment(tp.file.title, "YYYY-MM-DD").subtract(1, "days").format("YYYY-MM-DD") %>]] | [[<% moment(tp.file.title, "YYYY-MM-DD").format("YYYY-[W]WW")-%>|<% moment(tp.file.title, "YYYY-MM-DD").format("[W]WW")-%>]] | [[<% moment(tp.file.title, "YYYY-MM-DD").add(1, "days").format("YYYY-MM-DD") %>]] >>
## Timeline
- <% moment().format('HH') -%>:<% moment().format('mm') -%> - Logging in
## Todo 
### Check-ins
- [ ] [Diff reviews](https://www.internalfb.com/diffs/)
<%*
	const currentDate = moment(tp.file.title, "YYYY-MM-DD");
	const isMonday = currentDate.day() === 1;
	const dv = this.app.plugins.plugins["dataview"].api;
	const dateLastTOMTask = await dv.pages('#daily')
		.where(
			p => p.file.tasks.find(
				t => t.outlinks.length > 0 && dv.array(t.outlinks).find(
					l => l.type === 'file'
						&& l.display.includes('ToM Week')
				) != null
			) != null
		).map(p => p.file.name)
		.sort(v => v, 'desc')
		.first()
	if(
		isMonday
		|| !moment(dateLastTOMTask).isSame(currentDate, 'week')
	) {
		tR += `- [ ] Publish [[ToM Week ${currentDate.format("WW")}]]\n`
	}
-%>
<%* /* await tp.user.add_project_checkin_tasks(tp)*/ -%>
### Project Tasks
### Carry Over Tasks
```dataview
TASK
FROM #daily
WHERE !fullyCompleted AND file.name != this.file.name AND !contains(file.path, "Templates") AND date(file.name) < date(this.file.name)
GROUP BY file.link
SORT created ASC
```
## Learnings
## Thoughts
## Artifacts
