<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  tl;dr, baldwin info simplified. Unliked the database shortcut,<br>
  this tool calculates total basic items, the cost, the exp yielded.<br><br>
  
  <div class="text-bold">How to:<br>
  </div>
  
  Enter the number of items, followed by item name in the box below.<br>
  You can enter multiple item names by seperating them with linebreaks<br>
  (the Enter key stuff). Press the Submit button to show results.<br><br>
  
  Example input:<br>
  2 Glass Beaker<br>
  4 Reinforced Glass Beaker<br><br>
  
  The Print button prints out a nice detailed visual representation BBCode<br>
  which you can preview in a Forum post or a dragon's bio.<br>
  
  Some items, like Broken Bottles, have their full info omitted for ease<br>
  of use. <b>Chests are mostly RNG so do not try to focus to get an item from chests.</b><br><br>
  
  <textarea v-model="textStuff" placeholder="Enter item name here." style="width:90%;"></textarea><br>
  <button @click="generate">Submit</button>
  <button @click="generateVisual">Print</button><br><br>
  <p>{{ result }}</p>
  <div v-if="resultVisual != ''">Copy everything from here:<br></div>
  <p class="preformat">{{ resultVisual }}</p>
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
.preformat {
	white-space: pre-wrap;
	padding: 5px;
	font-size: 12px;
}
</style>

<script>
import HIBDEN from "@/data/database-shortcut/hibden.js";
import DATABASE from "@/data/database-shortcut/masterlist.js";
import MONSTERS from "@/data/database-shortcut/monsters.js";

function processText(textStuff) {
	/*var linesArray = textStuff.split('\n');
	var s = '';
	
	var totalThings = {};
	linesArray.forEach(line => {
		resultForm = processLine(line);
		totalThings = totalThings.concat(resultForm).reduce(((prev, curr)) => {
			let x = prev.find(e => e[0] == curr[0]);
			if (!x) curr.push(Object.assign({}.curr));
			else x[1] += curr[1];
			return curr
		}, [])
	});
	if (totalThings["Treasure"]) {
		s = s.concat("Treasure needed: ", totalThings["Treasure"], "\n");
		delete totalThings["Treasure"];
	}
	totalThings.forEach(thing => {
		s = s.concat(thing.name, ": ", thing.number, "\n");
	});
	return s;*/
	return textStuff;
}
			
/*function processLine(line) {
	var metaObect;
	if (line.substring(0,7) === "Hibden:") {
		HIBDEN[line.substring(8,line.length)].forEach(thing => {
			var obj = processLine(thing[0], modeFull);
			obj[1] = obj[1]*thing[1];
		});
	} else {
		
	}
}*/

export default {
	data() {
		return {
			result: '',
			resultBBCode: '',
			resultVisual: '',
			textStuff: '',
		};
	},
	head() {
		return {
			title: "Baldwin Calculator",
		};
	},
	methods: {
		generate() {
			var tuples = processText(this.textStuff);
			this.resultFull = tuples[0];
			this.resultBBCode = tuples[1];
		},
		generateVisual() {
			if (this.resultBBCode != '') {
				this.resultVisual = this.resultBBCode;
			}
		},
	}
}
</script>
