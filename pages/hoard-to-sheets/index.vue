<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  Select All (Ctrl+A) on Hoard webpage, copy,<br>
  paste into box. Text comes out, copy that and<br>
  paste into Google Sheets.<br>
  Click the "Copy" button to copy the result text.<br><br>
  
  No template Sheets link, but the data is as follows:<br>
  1st column is item id.<br>
  2nd column is item name.<br>
  3rd column is item quantity.<br><br>
  
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
const HTMLParser = require('node-html-parser');

function buildString(t) {
	const r = HTMLParser.parse(t);
	
	//header
	let rows = r.querySelectorAll(".itemicon");
	let qtys = r.querySelectorAll(".hoard-result-item");
	let str = '';
	
	for (let i = 0; i < rows.length; i++) {
		//prepare variables
		let id;
		let name;
		let q;
		
		//first div
		id = rows[i].getAttribute("data-itemid");
		name = rows[i].getAttribute("data-name");
		
		//second div
		q = qtys[i].getAttribute("data-quantity");
		
		//string building
		let row_str = id;
		row_str += '\t' +  name;
		row_str += '\t' +  q;
		console.log(row_str);
		
		str += row_str + '\n';
	}
	
	return str;
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
			title: "Hoard to Sheets",
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
					pastedText = e.clipboardData.getData('text/html');
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
				alert('Not valid AH data?');
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
