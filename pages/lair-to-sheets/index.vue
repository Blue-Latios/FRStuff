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
import PARSER from "@/utils/parser.js";

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
						} finally {
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
		  let res = PARSER.parseLairPage(t);
		  if (res == null) {
		    alert("Not valid lair data?");
		  } else
	      this.results = res;
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
