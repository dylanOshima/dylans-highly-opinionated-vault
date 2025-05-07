---
tags:
  - top-of-mind
  - wp-post
---
# ToM Week <% moment().format("WW") %>
<% `*[[ToM Week ${moment().subtract(7, 'days').format('WW')}|Previous Post]]*` %>
## This Week
### Focus 🔎️

*If the **order doesn't seem right to you**, or **_you think I'm missing something_** for this week **leave a comment** and let me know!*
## Last Week
### Completed ✅️
### Unfinished 🎒️

### Personal 🐶️

CC:

#top-of-mind-post

---

## Refs
- [Diffs from last week](https://fburl.com/diffs/)

<% await tp.file.move("/Outputs/Posts/Top of Minds/" + tp.file.title) %>
