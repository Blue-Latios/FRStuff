<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  Select All wishlist text containing old gene format,<br>
  copy, paste into box. Text comes out, copy that and<br>
  paste into the wishlist, or in a Notepad/textfile<br>
  to check first.<br>
  Click the "Copy" button to copy the result text.<br><br>
  
  <textarea v-model="textStuff" placeholder="Copy Paste here." @paste="htmlPaste" style="width:90%;"></textarea><br>
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
function buildString(t) {
	
	//data extraction
	let regex = /\[item\s*=\s*(Primary|Secondary|Tertiary)\s+Gene\s*:\s*([^\(\)\[\]]+)\s*\(\s*([^\(\)\s]+)\s*\)\s*\]/gi;

	let matches = [];
	let match;

	while ((match = regex.exec(t)) !== null) {
		let item = match[1].toLowerCase();
		console.log(item)
		let name = match[2].trim();
		console.log(name)
		let type = match[3];
		console.log(type)
		matches.push({
			//original: match[0], // Original matched string
			replacement: `[item=${item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()} ${type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()} Gene: ${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}]`,
			index: match.index, // Index where the match starts in the input string
			last: match.index + match[0].length // Length of the matched string
		});
	}

	// Reconstruct the modified string
	
	let resultString = t.slice(0, matches[0].index) + matches[0].replacement;

	for (let i = 1; i < matches.length; i++) {
	  resultString += t.slice(matches[i-1].last, matches[i].index) + matches[i].replacement;
	};
	
	resultString += t.slice(matches[matches.length-1].last, t.length)
	
	return resultString;
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
			title: "Gene Format Updater",
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
		processInput(t) {
			try {
				this.results = buildString(t);
			} catch(e) {
				alert('Not text?');
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
