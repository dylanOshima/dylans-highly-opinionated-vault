<%*
	// Store utils
	this.app.utils = require(app.vault.adapter.basePath + '/Scripts/utils');
-%>
<%*
  const CALENDAR_FOLDER = "/Calendar/";
  let title = tp.file.title;
  console.log({title})
  var output;
  if(title.toLowerCase().includes('meeting')) {
	// Handling meeting notes
    output = await tp.file.include("[[Meeting Notes]]")
  } else if(
	  title.toLowerCase().includes('post')
	  || title.toLowerCase().includes('note')
  ) {
	// Handling posts/notes
    output = await tp.file.include("[[Post Template]]")
  } else if (/^\d\d\d\d-\d\d-\d\d$/gm.test(title)) {
    // Handling daily notes
    output = await tp.file.include("[[Templates/Daily]]")
    await tp.file.move(CALENDAR_FOLDER + tp.file.title)
  } else if (/^\d\d\d\d-\d\d$/gm.test(title)) {
	// Handling monthly notes
    output = await tp.file.include("[[Templates/Monthly]]")
	await tp.file.move(CALENDAR_FOLDER + tp.file.title)
  } else if (/^\d\d\d\d-W\d\d$/gm.test(title)) {
	// Handling Weekly notes
    output = await tp.file.include("[[Templates/Weekly]]")
	await tp.file.move(CALENDAR_FOLDER + tp.file.title)
  } else if(/ToM Week \d\d/.test(title)) {
	// Handling top of mind posts
    output = await tp.file.include("[[Templates/Top of Mind]]")
    await tp.file.move("/Outputs/Posts/Top of Minds/" + title)
  }
-%>
<%* output != null && output.length > 0 ? tR +=`${output}` : '' %>