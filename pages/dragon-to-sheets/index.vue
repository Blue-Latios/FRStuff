<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  Select All on dragon page, copy, paste into box.<br>
  Text comes out, copy that and paste into Google Sheets.<br>
  Click the "Copy" button to copy the result text.<br><br>
  
  <div class="text-bold">Sheets link:<br>
  </div>
  
  https://docs.google.com/spreadsheets/d/1C_Bsog-brvpPR1ANAhLgegZdtorwwtCUcswm40W7cCc<br><br>
  
  <textarea v-model="textStuff" placeholder="Copy Paste here." @paste="htmlPaste" style="width:90%;"></textarea><br>
  <textarea v-model="results" class="results" ref="res" placeholder="Results to copy into sheet will be shown here." style="width:90%;"></textarea><br>
  <button @click="copyText">Copy</button><br><br><br>
  
  <hr>
  <div class="footnote" style="font-size: 10px;"><a href="https://www1.flightrising.com/forums/gde/3269795">Tool thread</a><br>
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
const HTMLParser = require('node-html-parser');

function buildString(t) {
	const r = HTMLParser.parse(t);
	
	//data extraction
	
	//header
	let name = r.querySelector("#main-content").text;
	let id = r.querySelector("#dragon-profile-share").getAttribute("data-id");
	
	//icons
	let gender = r.querySelector(`span[data-tooltip-source="#dragon-profile-icon-sex-tooltip"]`).querySelector("img").getAttribute("src").match(/\/([^/]+)\.png$/)[1];
	gender = gender[0].toUpperCase() + gender.slice(1);
	
	let isPermabab = r.querySelector(`span[data-tooltip-source="#dragon-profile-icon-eternal-youth-tooltip"]`);
	isPermabab = (isPermabab ? "Yes" : "No");
	let isSilhouette = r.querySelector(`span[data-tooltip-source="#dragon-profile-icon-silhouette-tooltip"]`);
	isSilhouette = (isSilhouette ? "Yes" : "No");
	
	//Physical Attributes
	const phys = r.querySelector("#dragon-profile-physical");
	
	let measurements = phys.querySelectorAll(".dragon-profile-stat-value");
	let length = measurements[0].text.slice(0,-2);
	let wingspan = measurements[1].text.slice(0,-2);
	let weight = measurements[2].text.slice(0,-3);
	
	const iconvalues = phys.querySelectorAll(".dragon-profile-stat-icon-value");
	let primaryColor = iconvalues[0].childNodes[0].text.trim();
	let primaryGene = iconvalues[0].querySelector("strong").text.split(" (")[0]; //split to remove ancient gene variant
	let secondaryColor = iconvalues[1].childNodes[0].text.trim();
	let secondaryGene = iconvalues[1].querySelector("strong").text.split(" (")[0];
	let tertiaryColor = iconvalues[2].childNodes[0].text.trim();
	let tertiaryGene = iconvalues[2].querySelector("strong").text.split(" (")[0];
	
	let birthdate = iconvalues[3].querySelector("strong").text;
	let breed = iconvalues[4].querySelector("strong").text;
	
	let element = iconvalues[5].childNodes[0].text.trim();
	let eyes = iconvalues[5].querySelector("strong").text;
	
	let gen = r.querySelector(".dragon-profile-lineage-parents").querySelector("em");
	gen = (gen ? "1" : "2+");
	let isBred = r.querySelector(".dragon-profile-lineage-offspring").querySelector("em");
	isBred = (isBred ? "No" : "Yes");
	
	
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
	str += '\t' + birthdate;
	str += '\t' + isBred;
	str += '\t' + length;
	str += '\t' + wingspan;
	str += '\t' + weight;
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
			try {
				this.results = buildString(t);
			} catch(e) {
				alert('Not valid dragon data?');
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
