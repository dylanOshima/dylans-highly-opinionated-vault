```dataview
CALENDAR deadline
FROM #project
WHERE typeof(deadline) = "date"
```
## Project Impact
### My Team
```dataview
TABLE status, deadline, role
FROM #project
WHERE !contains(file.path, "Templates") AND contains(file.path, "My Team") AND !contains(file.path, "Archived")
SORT deadline DESC
```
## BE
### Developer Efficiency Projects
```dataview
TABLE status, deadline, role
FROM #project
WHERE !contains(file.path, "Templates") AND contains(file.path, "Developer Efficiency") AND !contains(file.path, "Archived")
SORT deadline DESC
```
## People
## Areas
```ccard
type: folder_brief_live
```
