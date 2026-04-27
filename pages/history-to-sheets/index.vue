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
function getBetween(s, start, end) {
  let re = new RegExp(start + "([\\s\\S]*?)" + end);
  return s.match(re)[1];
}

function buildString(r) {

	//data extraction
	const currency_pattern = /icon_([^]*?)\.png/;
	
	const rowPattern = /<div class="ah-listing-row"([^]*?)<\/div>\s*<\/div>\s*<\/div>/g;
  let matches = r.matchAll(rowPattern);
  
  let str = '';
  
  for (let match of matches) {
    let data = match[1];
    let type, name, sale_type, quantity, currency, amount, date;
    
    if (data.includes("href=\"https://www1.flightrising.com/dragon")) {
      type = "Dragon";
			name = '#' + data.match(/dragon\/(\d+)"/)[1];
			quantity = '1';
    } else {
      let classnames = data.match(/<div class="([\s\S]*?)"/)[1].split(" "); //take the first match, ignore others
      if (classnames.length == 3) {
				type = classnames[1].match(/itemicon-([^]*?)-(prev|scry)/)[1].trim();
				if (type == "fam") type = "Familiar";
			} else {
				type = data.match(/static\/cms\/([^]*?)\//)[1].trim();
			}
			type = type[0].toUpperCase() + type.slice(1);
			name = data.match(/data-name="([^]*?)"/)[1];
			quantity = data.match(/data-quantity="([^]*?)"/)[1];
    }
    
    let sale_desc = data.match(/<b>(\w+)<\/b> on ([^]*?)\s*<\/div>/);
    sale_type = sale_desc[1];
    date = sale_desc[2];
    
    currency = data.match(/www1.flightrising.com\/static\/layout\/icon_(\w+)\.png/)[1];
    currency = currency[0].toUpperCase() + currency.slice(1);
    amount = data.match(/ah-listing-cost">(\d+)</)[1];
    
    let row_str = type;
		row_str += '\t' +  name;
		row_str += '\t' +  sale_type;
		row_str += '\t' +  quantity;
		row_str += '\t' +  currency;
		row_str += '\t' +  amount.replace(/[^\d]/g, ''); //remove commas and periods. Remove replace if normal text needed
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
