<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  Select range of rows and columns of Google Sheet whose<br>
  columsn you want to rearrange, copy, paste into the input<br>
  box. Then, fill the new order sequence on the second box,<br>
  then click "Generate" button.<br>
  Click the "Copy" button to copy the result text.<br><br>
  
  The order that you enter is where you want the first input<br>
  column to go in the new sheet's columns, the second column<br>
  in the new sheet's columns, and so on. Example:<br><br>
  You have a row of data as follows:<br><br>
  Apple, Red, Tasty, 5<br>
  (A B C D in the first sheet's columns)<br><br>
  And you want to rearrange the columns into this:<br><br>
  5, Red, Apple, Tasty<br>
  <br>
  The order that you enter would be: "C B D A"<br>
  (Apple goes to column C, Red goes to column B, and so on)<br><br>
  If you want to leave 4th column blank, such as:<br><br>
  5, Red, Apple, _, Tasty<br>
  <br>
  You can enter the order to be "C B E A" instead<br>
  (Leaving 4th column D blank).<br><br>
  To omit columns, use underscore '_' symbol.<br>
  Example: "C B _ A"<br><br>
  
  *Note: supports only up to column ZZ.<br><br>
  
  <textarea v-model="textStuff" placeholder="Copy Paste Sheet text here." @paste="htmlPaste" style="width:90%;"></textarea><br>
  <textarea v-model="order" placeholder="Type letters of new columns order here, seperated by space or newline. (Example: D B A C)" style="width:90%;"></textarea><br>
  <button @click="processInput">Generate</button><br><br>
  <textarea v-model="results" class="results" ref="res" placeholder="Results to copy into sheet will be shown here." style="width:90%;"></textarea><br>
  <button @click="copyText">Copy</button><br><br><br>
  
  <hr>
  <div class="footnote" style="font-size: 10px;"><a href="https://www1.flightrising.com/forums/gde/3269795">Tool thread</a><br>
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

function char_to_num(c) {
	return c.charCodeAt(0) - 65;
}

function largest(arr) {
	let max = arr[0];
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] > max)
			max = arr[i]
	}
	return max;
}

function col_to_idx(chars) {
	if (chars[0] == '_')
		return -1;
	chars = chars.toUpperCase();
	if (chars.length == 2)
		return char_to_num(chars[0])*26 + char_to_num(chars[0]);
	else if (chars.length > 2)
		throw new Error("more2");
	else
		return char_to_num(chars[0]);
}

function buildString(t, o) {
	o = o.split(/\s+/);
	let orderSequence = [];
	o.forEach(chars => {
		orderSequence.push(col_to_idx(chars));
	});
	let max = largest(orderSequence);
	
	let str = "";
	t = t.split('\n');
	//console.log(orderSequence);
	
	t.forEach(row => {
		let rowData = Array(max).fill('');
		row = row.split('\t');
		//console.log(row);
		for (let i = 0; i < orderSequence.length; i++) {
			if (orderSequence[i] != -1)
				rowData[orderSequence[i]] = row[i];
		}
		
		str += rowData[0];
		for (let i = 1; i < rowData.length; i++) {
			str += '\t' + rowData[i];
		}
		str += '\n';
	});
	return str;
}

export default {
	data() {
		return {
			results: '',
			textStuff: '',
			order: '',
		};
	},
	head() {
		return {
			title: "Sheets Columns Sorter",
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
			this.textStuff = pastedText;
			} catch(e) {
				alert('Error! Not valid pasted data.');
			}
		},
		processInput() {
			try {
				this.results = buildString(this.textStuff, this.order);
			} catch(e) {
				if (e.message=="more2")
					alert('Column index further than ZZ !');
				else
					alert('Not valid text data?');
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
