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
  
  The BBCode button prints out a nice detailed visual representation BBCode<br>
  which you can preview in a Forum post or a dragon's bio.<br>
  <b>At present, the items included are focused on Hibernal Den Task<br>
  items.</b> Swipp and Baldwin items coming soon.<br><br>
  
  Special feature: For Hibernal Den items, you can start input a line with "Hibden:"<br>
  followed by the name of the Hibernal Den Task.<br>
  Hibden:Clay for the Den<br><br>
  
  Note: Some items, like Broken Bottles, have their full info omitted for ease<br>
  of use. <b>Chests are mostly RNG so do not try to focus to get an item from chests.</b><br>
  *All items in Rusted Treasure Chest are also in Iron Treasure Chest and<br>
  Gilded Decorative Chest, and all items in Iron Treasure Chest are also in Gilded<br>
  Decorative Chest.<br><br>
  
  <textarea v-model="textStuff" placeholder="Enter item name here." style="width:90%;"></textarea><br>
  <button @click="generate">Submit</button>
  <button @click="generateVisual">BBCode</button><br><br>
  <Expandable v-for="(line, i) in result" :key="i" :line="line" />
  <div v-if="resultVisual != ''">Copy everything from here:<br></div>
  <p class="preformat" v-html="resultVisual"></p>
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
import Expandable from "@/components/Expandable.vue";

function processText(textStuff) {
	var linesArray = textStuff.split('\n');
	var s = [];
	var s2 = '';
	
	linesArray.forEach(line => {
		var a = line.trim();
		s = s.concat(processLine(a) + "<br>");
		s2 += processLine2(a) + "<br>";
	});
	return [s, s2];
}
			
function processLine(line, mode=0) {
	//mode 1 = swipp
	//mode 2 = baldwin
	var s = '';
	if (line.substring(0,7) === "Hibden:") {
		var t = line.substring(7,line.length).trim();
		if (HIBDEN[t]) {
			s += t + "<br><ul>";
			HIBDEN[t].forEach(thing => {
				s = s.concat("<li>", thing[1], " of ", processLine(thing[0]), "</li>");
			});
			return s.concat("</ul>");
		} else {
			return s.concat("The task \"<b>" + t + "</b>\" is undefined!<br>");
		}
	} else {
		if (!DATABASE[line]) return line.concat(" is not in the database yet!<br>");
		if (DATABASE[line].id >= 574 && DATABASE[line].id <= 576) s = line; //We ignore chests
		else if (!DATABASE[line].containers && !DATABASE[line].monsters && !DATABASE[line].gathering && !DATABASE[line].baldwin && !DATABASE[line].swap && !DATABASE[line].marketplace) s = line;
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
				s += "Dropped by:<br>";
				if (DATABASE[line].monsters[0][0].split(" ")[0] == "[C]") {
					s += DATABASE[line].monsters[0][0].substring(4) + " (" + DATABASE[line].monsters[0][1] + ")<br>";
				} else {
					s += "<ul>";
					DATABASE[line].monsters.forEach(tup => {
						s += "<li>" + tup[0] + " in " + MONSTERS[tup[0]] + " (" + tup[1] + ")</li>";
					});
					s += "</ul>";
				}
			}
			if (DATABASE[line].swap) {
				if (mode != 1) s += "<i>Swipp Swap</i><br><ul>";
				
				DATABASE[line].swap.forEach(item => {
					s = s.concat("<li>", item[1], " of ", processLine(item[0], 1), "</li>");
				});
				s += "</ul>";
			}
			if (DATABASE[line].marketplace) {
				s += "Purchasable in <i>Marketplace</i> for " + DATABASE[line].marketplace + " treasure<br>";
			}
		}
		return s;
	}
}

function processLine2(line, mode=0) {
	//mode 1 = swipp
	//mode 2 = baldwin
	var s2 = '';
	if (line.substring(0,7) === "Hibden:") {
		var t = line.substring(7,line.length).trim();
		if (HIBDEN[t]) {
			s2 += "[size=4][b]" + t + "[/b][/size]<br>[list]"
			HIBDEN[t].forEach(thing => {
				s2 = s2.concat("[*]", thing[1], " of ", processLine2(thing[0]), "<br>");
			});
			return s2.concat("[/list]<br>");
		} else return s2;
	} else {
		if (!DATABASE[line]) return line.concat(" is not in the database yet!<br>");
		if (DATABASE[line].id >= 574 && DATABASE[line].id <= 576) s2 = "[gamedb item=" + DATABASE[line].id + "]"; //We ignore chests
		else if (!DATABASE[line].containers && !DATABASE[line].monsters && !DATABASE[line].gathering && !DATABASE[line].baldwin && !DATABASE[line].swap && !DATABASE[line].marketplace) s2 = "[gamedb item=" + DATABASE[line].id + "]";
		else {
			s2 += "[gamedb item=" + DATABASE[line].id + "]<br>";
			
			if (DATABASE[line].baldwin) {
				if (mode != 2) s2 += "[i]Baldwin[/i]<br>";
				s2 += (DATABASE[line].baldwin.yield > 1 ? "[size=2][i](Recipe: x" + DATABASE[line].baldwin.yield + ")[/i][/size][list]" : "[list]");
				
				DATABASE[line].baldwin.items.forEach(item => {
					s2 = s2.concat("[*]", item[1], " of ", processLine2(item[0], 2), "<br>");
				});
				s2 += "[/list]";
			}
			if (DATABASE[line].containers) {
				s2 += "Found in:<br>[list]";
				DATABASE[line].containers.forEach(item => {
					s2 = s2.concat("[*]", processLine2(item), "<br>");
				});
				s2 += "[/list]";
			}
			if (DATABASE[line].gathering) {
				s2 = s2.concat(DATABASE[line].gathering.method, " Lv. ",
				DATABASE[line].gathering.level, " in: ");
				if (DATABASE[line].gathering.locations[0] == "All") s2 += "All locations.<br>";
				else {
					s2 += DATABASE[line].gathering.locations[0];
					DATABASE[line].gathering.locations.slice(1).forEach(loc => {
						s2 += ", " + loc;
					});
					s2 += "<br>";
				}
			}
			if (DATABASE[line].monsters) {
				s2 += "Dropped by:<br>";
				if (DATABASE[line].monsters[0][0].split(" ")[0] == "[C]") {
					s2 += DATABASE[line].monsters[0][0].substring(4) + " (" + DATABASE[line].monsters[0][1] + ")<br>";
				} else {
					s2 += "[list]";
					DATABASE[line].monsters.forEach(tup => {
						s2 += "[*]" + tup[0] + " in " + MONSTERS[tup[0]] + " (" + tup[1] + ")<br>";
					});
					s2 += "[/list]";
				}
			}
			if (DATABASE[line].swap) {
				if (mode != 1) s2 += "[i]Swipp Swap[/i]<br>[list]";
				
				DATABASE[line].swap.forEach(item => {
					s2 = s2.concat("[*]", item[1], " of ", processLine2(item[0], 1), "<br>");
				});
				s2 += "[/list]";
			}
			if (DATABASE[line].marketplace) {
				s2 += "Purchasable in [i]Marketplace[/i] for " + DATABASE[line].marketplace + " treasure<br>";
			}
		}
		return s2;
	}
}

export default {
	components: {Expandable},
	data() {
		return {
			result: [],
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
