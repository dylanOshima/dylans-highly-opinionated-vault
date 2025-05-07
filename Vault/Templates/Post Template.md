---
tags:
  - wp-post
role: dri
deadline:
---
*Collaborators*: [[Me]]
*Posted in*: 

---
# <% tp.file.title.replace(/\s?\[?post\]?\s?\-?\s?/ig, '').replace(/\s?\[?note\]?\s?\-?\s?/ig, '') %>

<% await tp.file.move("Outputs/Posts/" + tp.file.title) %>