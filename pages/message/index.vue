<template>
<div class="container">
	<div class="text-bold">What is this?<br>
	</div>
	Select All on <i>format sheet</i>, copy, paste into first<br>
	box. Then, do the same for <i>variable sheet</i> and data<br>
	sheet, paste into second and third box. Copy result<br>
	from result box and paste into Google Sheets.<br>
	Click the "Copy" button to copy the result text.<br>
	<br>
	For <i>format sheet</i>, every row is seperated by a<br>
	newline. To add more newlines, you can also use <b>\n</b>.<br>
	(Tips: add \n at the end to make two newlines.)<br>
	Use <b>[ ]</b> for parts you want to assign automatically.<br>
	Example:<pre>
Hello, [user]! My name is [name]!
	</pre>
	For <i>variable sheet</i>, first column is the automatic parts<br>
	used in <i>format sheet</i>, second column is the corresponding<br>
	column containing the needed information in <i>data sheet</i>.<br>
	Use <b>*</b> for whole rows to omit, if variable is empty.<br>
	Example:<pre>
user	A
name	B
extra*	C
	</pre>
	For <i>data sheet</i>, well, it's the rows of data.<br>
	Example (first column is A, second column is B):<pre>
Apple	Orange
Candy	Tree
Soil	Granite
	</pre><br>
	
	<textarea v-model="formatStuff" placeholder="Copy Paste format sheet here." @paste="formatPaste" style="width:90%;"></textarea><br>
	<textarea v-model="varStuff" placeholder="Copy Paste variable sheet here." @paste="varPaste" style="width:90%;"></textarea><br>
	<textarea v-model="dataStuff" placeholder="Copy Paste data sheet here." @paste="dataPaste" style="width:90%;"></textarea><br>
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

function cleanPastedText(text) {
    return text.split("\n")
        .filter(line => line.trim() !== "") // Remove tabs and trim the line
        .join("\n");
}

export default {
	data() {
		return {
			results: '',
			formatStuff: '',
			varStuff: '',
			dataStuff: '',
			variableMap: {},
		};
	},
	head() {
		return {
			title: "Sheets Message Template Generator",
		};
	},
	methods: {
		formatPaste(e) {
			try {
				let pastedText = cleanPastedText(e.clipboardData.getData('text/plain'));
				this.$nextTick(() => {
					this.formatStuff = pastedText;
				});
			} catch(e) {
				alert('Error! Not valid pasted format?');
			}
		},
		varPaste(e) {
			try {
				let pastedText = cleanPastedText(e.clipboardData.getData('text/plain'));
				this.varStuff = pastedText;
				this.processVariables();
			} catch(e) {
				alert('Error! Not valid pasted variables?');
			}
		},
		dataPaste(e) {
			try {
				let pastedText = cleanPastedText(e.clipboardData.getData('text/plain'));
				this.dataStuff = pastedText;
				this.processResults();
			} catch(e) {
				alert('Error! Not valid pasted data or format?');
			}
		},
		processVariables() {
			// Parse variable mappings from varStuff
			const lines = this.varStuff.split("\n");
			this.variableMap = {};
			lines.forEach((line) => {
				const [key, column] = line.split("\t");
				if (key && column) {
					this.variableMap[key.replace("*", "").trim()] = {
					column: column.trim(),
					required: key.includes("*"),
					};
				}
			});
		},
		processResults() {
			const formatLines = this.formatStuff.split("\n");
			const maxRows = formatLines
			  .map(line => line.replace(/\\n/g, "\n")) // Replace inline "\n" with actual newlines
			  .join("\n") // Join to form a single string with actual newlines
			  .split("\n").length;
			const dataRows = this.dataStuff.split("\n").filter((row) => row.trim());
			const output = Array.from({ length: maxRows }, () => []); // Initialize container
			
			dataRows.forEach((row) => {
				const dataColumns = row.split("\t");
				let formattedLines = [];

				let align = 0;
				formatLines.forEach((line, index) => {
					
					let formattedLine = line;
					let skipLine = false;
					
					for (const [key, config] of Object.entries(this.variableMap)) {
						const value = dataColumns[this.columnToIndex(config.column)] || "";

						if (formattedLine.includes(`[${key}]`) && config.required && !value.trim()) {
							skipLine = true; // Skip the entire line if required value is missing
							break;
						}

						formattedLine = formattedLine.replaceAll(`[${key}]`, value.trim() || "");
					}

					if (!skipLine) {
						formattedLine = formattedLine.replace(/\\n/g, "\n"); // Replace "\n" with actual newlines
						
						let newLines = formattedLine.split("\n");
						newLines.forEach((part, idx) => {
							formattedLines[index + align + idx] = part;
						});
						align += newLines.length - 1;
						
					} else {
						align--;
					}
				});

				// Append horizontally to the output container
				formattedLines.forEach((line, index) => {
					if (line) output[index].push(line);
				});
			});
			
			let dataHeader = Array.from({ length: dataRows.length }, (_, i) => `[Row ${i + 1}]`).join("\t");
			console.log(dataHeader);
			// Join each row into a single line, tab-separated
			this.results = [dataHeader, ...output.map(row => row.join("\t"))].join("\n");
		},
		columnToIndex(column) {
			// Convert column letters (e.g., A, B, C) to 0-based indices
			return column.toUpperCase().charCodeAt(0) - 65;
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
