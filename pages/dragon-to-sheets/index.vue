<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  Select All on dragon page, copy, paste into box.<br>
  Text comes out, copy that and paste into Google Sheets.<br>
  Click the "Copy" button to copy the result text.<br><br>
  
  <div class="text-bold"><a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/spreadsheets/d/1C_Bsog-brvpPR1ANAhLgegZdtorwwtCUcswm40W7cCc">Click for Sheets Link Here</a>
  </div><br>
  
  <textarea v-model="textStuff" placeholder="Copy Paste here." @paste="htmlPaste" style="width:90%;"></textarea><br>
  <textarea v-model="results" class="results" ref="res" placeholder="Results to copy into sheet will be shown here." style="width:90%;"></textarea><br>
  <button @click="copyText">Copy</button><br><br><br>
  
  <hr>
  <div class="footnote" style="font-size: 10px;"><a target="_blank" rel="noopener noreferrer" href="https://www1.flightrising.com/forums/gde/3269795">Tool thread</a><br>
  Tool by BlueLatios. Tool inspired by G1 Hoarders Pinglist site.</div>
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
			title: "Dragon to Sheets",
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
		  let res = PARSER.parseDragonPage(t);
		  if (res == null) {
		    alert("Not valid dragon data?");
		  } else
	      this.results = res.join("\t");
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
