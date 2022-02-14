<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  tl;dr, game database info simplified.<br><br>
  
  <div class="text-bold">How to:<br>
  </div>
  
  Enter the item name in the box below.<br>
  You can enter multiple item names by seperating them with linebreaks<br>
  (the Enter key stuff). Press the Submit button to show results.<br><br>
  
  Example input:<br>
  Glass Beaker<br>
  Rusted Treasure Chest<br><br>
  
  The Print button prints out a nice detailed visual representation BBCode<br>
  which you can preview in a Forum post or a dragon's bio.<br>
  <b>At present, the items included are focused on Baldwin, Swipp, and<br>
  Hibernal Den Task items.</b><br><br>
  
  Special feature: For Hibernal Den items, you can start input a line with "Hibden:"<br>
  followed by the name of the Hibernal Den Task.<br>
  Hibden:Clay for the Den<br><br>
  
  Note: make sure to leave no spaces after the colon (:) if inputting<br>
  a Hibden task title.<br>
  Some items, like Broken Bottles, have their full info omitted for ease<br>
  of use. <b>Chests are mostly RNG so do not try to focus to get an item from chests.</b><br><br>
  
  <textarea v-model="textStuff" placeholder="Enter item name here." style="width:90%;"></textarea><br>
  <button @click="generate">Submit</button>
  <button @click="generateVisual">Print</button><br><br>
  <p v-html="result"></p>
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
	var linesArray = textStuff.split('\n');
	var s = '';
	
	linesArray.forEach(line => {
		s += processLine(line) + "<br>";
	});
	return [s, s];
}
			
function processLine(line, mode=0) {
	//mode 1 = swipp
	//mode 2 = baldwin
	var s = '';
	if (line.substring(0,7) === "Hibden:") {
		s += "<b>" + line.substring(7,line.length) + "</b><br><ul>";
		HIBDEN[line.substring(7,line.length)].forEach(thing => {
			s = s.concat("<li>", thing[1], " of ", processLine(thing[0]), "</li>");
		});
		return s.concat("</ul><br>");
	} else {
		if (!DATABASE[line]) return line.concat(" is not in the database yet!<br>");
		if (DATABASE[line].id >= 574 && DATABASE[line].id <= 576) s = line; //We ignore chests
		else if (!DATABASE[line].containers && !DATABASE[line].monsters && !DATABASE[line].gathering && !DATABASE[line].baldwin && !DATABASE[line].swap) s = line;
		else {
			s += line + "<br>";
			
			if (DATABASE[line].baldwin) {
				if (mode != 2) s += "<i>Baldwin</i><br>";
				s += (DATABASE[line].baldwin.yield > 1 ? "<i>(Recipe: x" + DATABASE[line].baldwin.yield + ")</i><ul>" : "<ul>");
				
				DATABASE[line].baldwin.items.forEach(item => {
					s = s.concat("<li>", item[1], " of ", processLine(item[0], 2), "</li>");
				});
				s += "</ul>";
			}
			if (DATABASE[line].containers) {
				s += "Found in:<br><ul>";
				DATABASE[line].containers.forEach(item => {
					s = s.concat("<li>", processLine(item), "</li>");
				});
				s += "</ul>";
			}
			if (DATABASE[line].gathering) {
				s = s.concat(DATABASE[line].gathering.method, " Lv. ",
				DATABASE[line].gathering.level, " in: ");
				if (DATABASE[line].gathering.locations[0] == "All") s += "All locations.<br>";
				else {
					s += DATABASE[line].gathering.locations[0];
					DATABASE[line].gathering.locations.slice(1).forEach(loc => {
						s += ", " + loc;
					});
					s += "<br>";
				}
			}
			if (DATABASE[line].monsters) {
				s += "Dropped by:<br><ul>";
				DATABASE[line].monsters.forEach(tup => {
					s += "<li>" + tup[0] + " in " + MONSTERS[tup[0]] + " (" + tup[1] + ")</li>";
				});
				s += "</ul>";
			}
			if (DATABASE[line].swap) {
				if (mode != 1) s += "<i>Swipp Swap</i><br><ul>";
				
				DATABASE[line].swap.forEach(item => {
					s = s.concat("<li>", item[1], " of ", processLine(item[0], 1), "</li>");
				});
				s += "</ul>";
			}
		}
		return s;
	}
}

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
			title: "Database Shortcut",
		};
	},
	methods: {
		generate() {
			var tuples = processText(this.textStuff);
			this.result = tuples[0];
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
