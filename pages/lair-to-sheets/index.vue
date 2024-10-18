<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  Download or save a Lair/Den page, click<br>
  "Upload Webpage" button, then select the saved<br>
  webpage. If it's not saved as HTML webpage,<br>
  <u>you must rename the file and add .html to<br>
  the end</u>.<br>
  Alternatively, go to Lair/Den page, view<br>
  Page Source, copy all, and paste into the<br>
  input box. You can also go to the Edit tab to<br>
  get entire tab of dragons!<br>
  Text comes out, copy that and paste into<br>
  Google Sheets. Click the "Copy" button to copy<br>
  the result text.<br><br>
  
  <div class="text-bold"><a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/spreadsheets/d/1PwXIpCnLr10SYvqNkqX5B2DW9P-QlvUXQ9qA8o5AjY8">Click for Sheets Link Here</a>
  </div><br>
  
  <div class="text-bold" style="font-size:18px;">Page Source?<br>
  </div>
  It's the part of a webpage where all you see is text. To get there,<br>
  Add "<b>view-source:</b>" to the start of the URL link. Then select<br>
  all of the text, then copy and paste it into the box. (May not work<br>
  for mobile users.)<br><br>
  
  <input type="file" @change="handleFileUpload" ref="fileInput" style="display: none;" />
  <button @click="triggerFileInput">Upload Webpage</button><br>
  <textarea v-model="textStuff" placeholder="Or, copy and paste webpage source text here." @paste="htmlPaste" style="width:90%;"></textarea><br><br>
  <textarea v-model="results" class="results" ref="res" placeholder="Results to copy into sheet will be shown here." style="width:90%;"></textarea><br>
  <button @click="copyText">Copy</button><br><br><br>

  <hr>
  <div class="footnote" style="font-size: 10px;"><a target="_blank" rel="noopener noreferrer" href="https://www1.flightrising.com/forums/gde/3269795">Tool thread</a><br>
  Tool by BlueLatios.</div>
</div></template>

<style>
.container {
	padding: 10px;
	margin: 5px;
	font-size: 14px;
}
.text-bold {
	font-weight: bold;
	font-size: 20px;
}
.results {
	color:#777;
}
ul {
	margin-bottom: 0;
}
</style>

<script>

function buildString(t, i, cTime) {
	
	//tooltip data extraction
	const pattern = />([^<>]*)<\/div>/g;
	let data = [];
	let matches;
	
	while ((matches = pattern.exec(t)) !== null) {
		const captureString = matches[1];
		data.push(captureString);
	}
	
	//const n = 11; //11 substrings found in dragontip class pattern regex search
	
	let name = data[0].trim();
	
	let desc = data[1].trim().split(" ");
	let breed = desc[0];
	let gender = desc[1];
	
	let level = data[2].trim().split(" ")[1];
	
	let id = data[3].trim();
	//let age = data[4].trim();
	let gen = (data[5].trim().length == 0 ? "1" : "2+"); //only newlines and spaces found if First Generation
	
	let prim = data[6].trim().split(" ");
	let primaryColor = prim[0];
	let primaryGene = prim[1];
	let sec = data[7].trim().split(" ");
	let secondaryColor = sec[0];
	let secondaryGene = sec[1];
	let tert = data[8].trim().split(" ");
	let tertiaryColor = tert[0];
	let tertiaryGene = tert[1];
	
	let eye_type = data[9].trim().split(" ");
	let element = eye_type[0];
	let eyes = eye_type[1];
	
	//let food_type = data[10].trim();
	
	//icons data extraction
	let isPermabab = (i.includes("#icon-eternal-youth-tooltip") ? "Yes" : "No");
	let isSilhouette = (i.includes("#icon-silhouette-tooltip") ? "Yes" : "No");
	let isFlip = (i.includes("#icon-reflect-tooltip") ? "Yes" : "No");
	
	//string building
	let str = '';
	str += name;
	str += '\t' + gender;
	str += '\t' + breed;
	str += '\t' + primaryColor;
	str += '\t' + primaryGene;
	str += '\t' + secondaryColor;
	str += '\t' + secondaryGene;
	str += '\t' + tertiaryColor;
	str += '\t' + tertiaryGene;
	str += '\t' + element;
	str += '\t' + eyes;
	str += '\t' + gen;
	str += '\t' + isPermabab;
	str += '\t' + isSilhouette;
	str += '\t' + id;
	str += '\t' + level;
	str += '\t' + isFlip;
	str += '\t' + cTime;
	//console.log("passed");
	return str;
}

function buildStrings(page) {
	
	//get time taken
	
	let cTime = page.match(/<time datetime="([^"]+)"/)[1];
	
	//get dragontip data
	const dragontip_pattern = /class="dragontip"([^]*?)\[Click to see details about this dragon\.\]/g;
	let data = [];
	let matches;
	
	while ((matches = dragontip_pattern.exec(page)) !== null) {
		const captureString = matches[1].trim();
		data.push(captureString);
	}
	
	//get icons data
	const icons_pattern = /class="lair-page-dragon-tumbnail lair-dragon-tooltip" rel="#dragontip-([^]*?)(class="lair-page-dragon"|class="lair-footer")/g;
	//start string regex is so to get the first part of string is the ID
	let icons = [];
	while ((matches = icons_pattern.exec(page)) !== null) {
		const captureString = matches[1].trim();
		icons.push(captureString);
	}
	
	//console.log(data.length);
	//console.log(icons.length);
	
	//sort the icons data
	function compareStringsByNumber(a, b) {
		const numA = a.substring(0, a.indexOf(`">`));
		const numB = b.substring(0, b.indexOf(`">`));
		return numA - numB;
	}
	
	icons.sort(compareStringsByNumber);
	
	//string building
	let strAll = '';
	for (let i = 0; i < data.length; i++) {
		strAll += buildString(data[i], icons[i], cTime) + '\n';
	}
	return strAll;
}

export default {
	data() {
		return {
			results: '',
			textStuff: '',
		};
	},
	head() {
		return {
			title: "Lair to Sheets",
		};
	},
	methods: {
		htmlPaste(e) {
			let pastedText = '';
			try {
				if (window.clipboardData && window.clipboardData.getData) { // IE
					pastedText = window.clipboardData.getData('Text'); //unresolved
					alert('May not work in Internet Explorer');
				} else if (e.clipboardData && e.clipboardData.getData) {
					pastedText = e.clipboardData.getData('text');
				}
				
				this.processInput(pastedText);
			} catch(e) {
				alert('Error! Not valid pasted data.');
			}
		},
		triggerFileInput() {
			this.$refs.fileInput.click();
		},
		handleFileUpload(e) {
			try {
				const file = event.target.files[0];
				if (file && file.type === 'text/html') {
					const reader = new FileReader();
					reader.onload = (e) => {
						try {
							const fileContent = e.target.result;
							this.processInput(fileContent);
						} catch(e) {
							alert('Error! Something went wrong with file processing.');
						}  finally {
							this.$refs.fileInput.value = '';
						}
					}
				reader.readAsText(file);
				} else
					alert('Error! Not valid uploaded file?');
			} catch(e) {
				alert('Error! Something else went wrong.');
			}
		},
		processInput(t) {
			try {
				this.results = buildStrings(t);
			} catch(e) {
				alert('Not valid lair data?');
			}
		},
		copyText() {
			this.$refs.res.select();
			document.execCommand('copy');
			this.$refs.res.blur();
			this.results="Text copied successfully!";
		}
	}
}
</script>
