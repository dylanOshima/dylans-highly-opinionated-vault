---
assumed-level: 
title: 
team: 
tags:
  - people
---
## Projects Collaborated On
```dataview
TABLE WITHOUT ID
	file.name AS project,
	date(file.frontmatter.deadline) as Deadline,
	file.frontmatter.status AS Status
FROM #project
WHERE any(file.outlinks, (f) => contains(meta(f).path, this.file.name))
```
### Artifacts
```dataview
TABLE file.tags AS Tags
FROM [[<% tp.file.title %>]]
```
## Feedback
### Notes
### 2024 Feedback
<% await tp.file.move("/Team/People/" + tp.file.title) %>