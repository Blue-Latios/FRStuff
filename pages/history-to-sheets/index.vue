<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  Select All on Recent History of your Activity Ledger,<br>
  copy, paste into box. Text comes out, copy that and<br>
  paste into Google Sheets.<br>
  Click the "Copy" button to copy the result text.<br><br>
  
  No template Sheets link, but the data is as follows:<br>
  1st column is item type.<br>
  2nd column is item name.<br>
  3rd column is activity type (Purchased/Sold).<br>
  4th column is item quantity.<br>
  5th column is currency type (Gems/Treasure).<br>
  6th column is the currency number.<br>
  7th column is the sales date.<br><br>
  
  <textarea v-model="textStuff" placeholder="Copy Paste here." @paste="htmlPaste" style="width:90%;"></textarea><br>
  <textarea v-model="results" class="results" ref="res" placeholder="Results to copy into sheet will be shown here." style="width:90%;"></textarea><br>
  <button @click="copyText">Copy</button><br><br><br>
  
  <div class="footnote" style="font-size: 10px;">Contact BlueLatios if there's any questions.</div>
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
	const pattern = /itemicon-([^]*?)-(prev|scry)/;
	const img_pattern = /\/cms\/([^]*?)\//;
	const currency_pattern = /icon_([^]*?)\.png/;
	
	//header
	let rows = r.querySelectorAll(".itemicon");
	let lefts = r.querySelectorAll(".ah-listing-left");
	let rights = r.querySelectorAll(".ah-listing-right");
	let str = '';
	
	for (let i = 0; i < rows.length; i++) {
		//prepare variables
		let type;
		let name;
		let sale_type;
		let quantity;
		let currency;
		let amount;
		let date;
		
		//first div
		if (rows[i].getAttribute("href")) { //dragon sales have href attr
			type = "Dragon";
			name = '#' + rows[i].getAttribute("href").split("/").slice(-1);
			quantity = '1';
		} else {
			let classnames = rows[i].getAttribute("class").split(" ");
			let item_type;
			if (classnames.length == 3) {
				item_type = pattern.exec(classnames[1])[1].trim();
				if (item_type == "fam") item_type = "Familiar";
			} else {
				item_type = img_pattern.exec(rows[i].querySelector("img").getAttribute("src"))[1].trim();
			}
			type = item_type[0].toUpperCase() + item_type.slice(1);
			name = rows[i].getAttribute("data-name");
			quantity = rows[i].getAttribute("data-quantity");
		}
		
		//second div
		let sale_desc = lefts[i].querySelectorAll("div")[2];
		sale_type = sale_desc.querySelector("b").text;
		date = sale_desc.text.trim().split("on ")[1];
		
		//third div
		let currency_img = rights[i].querySelector("img").getAttribute("src");
		currency = currency_pattern.exec(currency_img)[1].trim();
		currency = currency[0].toUpperCase() + currency.slice(1);
		amount = rights[i].querySelector(".ah-listing-cost").text;
		
		//string building
		let row_str = type;
		row_str += '\t' +  name;
		row_str += '\t' +  sale_type;
		row_str += '\t' +  quantity;
		row_str += '\t' +  currency;
		row_str += '\t' +  amount;
		row_str += '\t' +  date;
		
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
			title: "Recent History to Sheets",
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
