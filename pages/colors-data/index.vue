<template>
<div class="container">
	<div class="text-bold">What is this?<br>
	</div>
	Tool for showing data on a list of colors.<br>
	You can copy and paste a list of colors<br>
	(seperated by a common seperator).<br>
	Example input:<br>
	<br>
	Green / Blue / Red<br>
	Orca / Navy / Shadow<br>
	Pumpkin / Red / Red<br>
	<br>		
	<br>
	If there are too many row errors, just<br>
	refresh the page.<br>
	<br>
	<br>
	<input type="file" accept=".txt" ref="fileInput" @change="handleFileUpload" style="display: none;"/>
	<button @click="triggerFileInput">Upload Text File</button>
	
	<br style="margin-bottom:8px">
	<textarea class="ta" placeholder="Copy Paste here." @paste="htmlPaste" style="width:90%;"></textarea><br>
	
	<span class="format-text" v-html="dataText"></span>
	
	<button v-if="totalText && totalText.length > 0" @click="toggleTotal">Show Top Occurring Colors</button>
	<br>
	<div v-if="isTotalOpen" class="format-text" v-html="totalText">
	</div>
	
	<button v-if="primText && primText.length > 0" @click="togglePrim">Show Top Primaries</button>
	<br>
	<div v-if="isPrimOpen" class="format-text" v-html="primText">
	</div>
	
	<button v-if="secText && secText.length > 0" @click="toggleSec">Show Top Secondaries</button>
	<br>
	<div v-if="isSecOpen" class="format-text" v-html="secText">
	</div>
	
	<button v-if="tertText && tertText.length > 0" @click="toggleTert">Show Top Tertiaries</button>
	<br>
	<div v-if="isTertOpen" class="format-text" v-html="tertText">
	</div>
	
	<button v-if="outlierText && outlierText.length > 0" @click="toggleOutlier">Show Outliers</button>
	<br>
	<div v-if="isOutlierOpen" class="format-text" v-html="outlierText">
	</div>
	
	<button v-if="missingText && missingText.length > 0" @click="toggleMissing">Show Missing Colors</button>
	<br>
	<div v-if="isMissingOpen" class="format-text" v-html="missingText">
	</div>
	
	<button v-if="nearDoubleText && nearDoubleText.length > 0" @click="toggleNearDouble">Show Near Doubles</button>
	<div v-if="isNearDoubleOpen" class="format-text" v-html="nearDoubleText">
	</div>
	
	<button v-if="nearTripleText && nearTripleText.length > 0" @click="toggleNearTriple">Show Near Triples</button>
	<div v-if="isNearTripleOpen" class="format-text" v-html="nearTripleText">
	</div>	
		
	<hr>
	<div class="footnote" style="font-size: 10px;"><a target="_blank" rel="noopener noreferrer" href="https://www1.flightrising.com/forums/gde/3269795">Tool thread</a><br>
	Tool presented by BlueLatios.</div>
</div></template>

<script>
import COLORS from "@/data/colors2.js";
const n_colors = COLORS.length;

//functions
function capitalizeWords(wordsArray) {
	return wordsArray.map(word => {
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	});
}

function titleCase(word) {
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function parseRows(text) {
	const rows = text.split('\n');
	const result = rows.map(row => {
		// Split by any of these separators: /, |, -, \, ,, or whitespace
		const words = row.split(/[/|,\\\-\s]+/).filter(Boolean);
		if (words.length === 3) return words;
		else {
			alert(`Incorrect row:\n\n${row}`);
			return null;
		}
	});

	return result.filter(Boolean); // Remove any rows that didn't match exactly 3 words
}

function categorizeRow(row) {
	// Assuming row is an array of 3 color names
	const [color1, color2, color3] = row;

	if (color1 === color2 && color1 === color3) {
		return 'XXX';	// All three colors are the same
	}

	if (color1 === color2 && color1 !== color3) {
		return 'XXY';	// The unique color is in the third position
	}
	if (color1 === color3 && color1 !== color2) {
		return 'XYX';	// The unique color is in the second position
	}
	if (color2 === color3 && color2 !== color1) {
		return 'XYY';	// The unique color is in the first position
	}

	return 'XYZ';	// All colors are different
}

function getMissingColors(data) {
	const allColors = Object.keys(COLORS); // Get the full list of colors
	const inputColors = data.flat().map(color => color); // Flatten

	// Create a Set from the input colors to avoid duplicates
	const inputSet = new Set(inputColors);

	// Find the colors that did not appear by filtering the allColors array
	const missingColors = allColors.filter(color => !inputSet.has(color));

	return missingColors;
}

function isNearMissDouble(row) {
	// Get the IDs of the colors in the row
	const ids = row.map(color => COLORS[color].id);

	// Check the difference between any two IDs
	for (let i = 0; i < ids.length; i++) {
		for (let j = i + 1; j < ids.length; j++) {
			const idDifference = Math.abs(ids[i] - ids[j]);
			if (idDifference <= 2) {
				return true; // Near-miss double found
			}
		}
	}
	return false; // No near-miss double
}

function isNearMissTriple(row) {
	// Get the IDs of the colors in the row
	const ids = row.map(color => COLORS[color].id);

	// Check the largest difference between any two IDs
	let maxDifference = 0;
	for (let i = 0; i < ids.length; i++) {
		for (let j = i + 1; j < ids.length; j++) {
			const idDifference = Math.abs(ids[i] - ids[j]);
			if (idDifference > maxDifference) {
				maxDifference = idDifference;
			}
		}
	}

	return maxDifference <= 2;
}

function printRows(rows) {
	return rows.map(row => capitalizeWords(row).join(" / ")).join("\n");
}

function getColorsWithLowestNonZeroLastValue(colorCounts) {
		// Step 1: Get all non-zero "last" values
		const nonZeroEntries = Object.entries(colorCounts)
				.filter(([_, colorData]) => colorData.last > 0); // Filters out zero "last" values

		// Step 2: Find the minimum "last" value
		const minLastValue = Math.min(...nonZeroEntries.map(([_, colorData]) => colorData.last));

		// Step 3: Find all colors with the minimum "last" value
		const colorsWithMinLast = nonZeroEntries
				.filter(([_, colorData]) => colorData.last === minLastValue)
				.map(([colorName]) => colorName);

		// Format the result
		const result = capitalizeWords(colorsWithMinLast).join(', ');
		
		return result;
}

function getTopColorsByAttribute(attribute, colorCounts) {
	const num = 3;
	// Step 1: Extract the relevant counts for the attribute
	const counts = Object.entries(colorCounts).map(([color, data]) => ({
		color,
		count: (attribute === "total") ? data.x + data.y + data.z : data[attribute],
	}));

	// Step 2: Sort colors in descending order by count
	counts.sort((a, b) => b.count - a.count);

	// Step 3: Find the top colors up to the third place, including any ties
	const topColors = [];
	let thresholdCount = null;

	for (let i = 0; i < counts.length; i++) {
		const { color, count } = counts[i];

		// Add the color if we're still below the "top 3" limit, or if it's tied with the threshold
		if (topColors.length < num || count === thresholdCount) {
			topColors.push({color: titleCase(color), count});
			if (topColors.length === num) {
				// Set the threshold count to the third item's count
				thresholdCount = count;
			}
		} else {
			break; // Stop if we've surpassed the top 3 (including ties)
		}
	}

	return topColors;
}


export default {
	data() {
		return {
			dataText: "",
			outlierText: "",
			isTotalOpen: false,
			totalText: "",
			isPrimOpen: false,
			primText: "",
			isSecOpen: false,
			secText: "",
			isTertOpen: false,
			tertText: "",
			isOutlierOpen: false,
			missingText: "",
			isMissingOpen: false,
			nearDoubleText: "",
			isNearDoubleOpen: false,
			nearTripletext: "",
			isNearTripleOpen: false,
		};
	},
	head() {
		return {
			title: "Colors Data",
		};
	},
	methods: {
	// Actual parts
		toggleTotal() {
			this.isTotalOpen = !this.isTotalOpen;
		},
		togglePrim() {
			this.isPrimOpen = !this.isPrimOpen;
		},
		toggleSec() {
			this.isSecOpen = !this.isSecOpen;
		},
		toggleTert() {
			this.isTertOpen = !this.isTertOpen;
		},
		toggleOutlier() {
			this.isOutlierOpen = !this.isOutlierOpen;
		},
		toggleMissing() {
			this.isMissingOpen = !this.isMissingOpen;
		},
		toggleNearDouble() {
			this.isNearDoubleOpen = !this.isNearDoubleOpen;
		},
		toggleNearTriple() {
			this.isNearTripleOpen = !this.isNearTripleOpen;
		},
		triggerFileInput() {
			this.$refs.fileInput.click();
		},
		htmlPaste(e) {
			let pastedText = '';
			try {
				if (window.clipboardData && window.clipboardData.getData) { // IE
					pastedText = window.clipboardData.getData('Text'); //unresolved
					alert('May not work in Internet Explorer');
					this.processPage(pastedText);
				} else if (e.clipboardData && e.clipboardData.getData) {
					pastedText = e.clipboardData.getData('text/plain');
					this.processText(pastedText);
				}
			} catch(e) {
				alert('Error! Not valid pasted data.');
			}
		},
		handleFileUpload(event) {
			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					const fileContent = e.target.result;
					this.processText(fileContent);
				};
				reader.readAsText(file);
			}
		},
		processText(t) {
			const data_arr = parseRows(t.toLowerCase());
			let out = ""
			
			let c_XXX = 0, c_XXY = 0, c_XYX = 0, c_XYY = 0, c_XYZ = 0;
			let nd_arr = [], nt_arr = [];
			const colorCounts = {};
			//const	= {};
			Object.keys(COLORS).forEach(colorName => {
				colorCounts[colorName] = {x: 0, y: 0, z: 0, last: 0, o: 0};
			});
			
			let pos = 0;
			
			for (let row of data_arr) {
				colorCounts[row[0]].x++;
				colorCounts[row[1]].y++;
				colorCounts[row[2]].z++;
				row.forEach(color => {
					colorCounts[color].last = pos;
				});
				const pattern = categorizeRow(row);
				
				// Increment the corresponding counter based on the pattern
				if (pattern === 'XXX') c_XXX++;
				else {
					if (pattern === 'XYZ') {
						c_XYZ++;
						//check near-miss double
						if (isNearMissDouble(row)) {
							nd_arr.push(row);
						}
					} else {
						if (pattern === 'XXY') {
							c_XXY++;
							colorCounts[row[2]].o++;
						} else if (pattern === 'XYX') {
							c_XYX++;
							colorCounts[row[1]].o++;
						} else if (pattern === 'XYY') {
							c_XYY++;
							colorCounts[row[0]].o++;
						}
						//check near-miss triple
						if (isNearMissTriple(row)) {
							nt_arr.push(row);
						}
					}
				}
				pos++;
			}
			
			let miss_arr = getMissingColors(data_arr);
			
			const outliers = Object.entries(colorCounts)
				.filter(([color, data]) => data.o > 2)				// Filter where o > 2
				.sort(([colorA, dataA], [colorB, dataB]) => dataB.o - dataA.o)	// Sort by o in descending order
				.map(([color, data]) => `${titleCase(color)}: ${data.o}`)
				.join('\n');
			
			const lastColors = getColorsWithLowestNonZeroLastValue(colorCounts);
			
			// Output the results
			out += `XXX: ${c_XXX}\n`;
			out += `XXY: ${c_XXY}\n`;
			out += `XYX: ${c_XYX}\n`;
			out += `XYY: ${c_XYY}\n`;
			out += `XYZ: ${c_XYZ}\n`;
			
			out += `Near-miss doubles (2-off): ${nd_arr.length}\n`;
			out += `Near-miss triples (2-off total): ${nt_arr.length}\n`;
			
			out += `Color that hasn't appeared again the longest: ${lastColors}\n`;
			
			this.dataText = out;
			out = ""
			
			this.totalText = getTopColorsByAttribute("total", colorCounts).map(result => `${result.color}: ${result.count}`).join("\n");
			
			this.primText = getTopColorsByAttribute("x", colorCounts).map(result => `${result.color}: ${result.count}`).join("\n");
			
			this.secText = getTopColorsByAttribute("y", colorCounts).map(result => `${result.color}: ${result.count}`).join("\n");
			
			this.tertText = getTopColorsByAttribute("z", colorCounts).map(result => `${result.color}: ${result.count}`).join("\n");
			
			this.outlierText = outliers;
			
			this.missingText = capitalizeWords(miss_arr).join(", ");
			
			this.nearDoubleText = printRows(nd_arr);
			this.nearTripleText = printRows(nt_arr);
			
		}
	}
}
</script>

<style scoped>
.text-bold {
	font-weight: bold;
	font-size: 20px;
}
.container {
	padding: 10px;
	margin: 5px;
	font-size: 14px;
}
.format-text {
	white-space: pre-line;
}
</style>
