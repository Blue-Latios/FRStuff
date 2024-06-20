<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  Extension of the Dragon and Lair template Sheets.<br>
  Select rows of data from those sheets, and then<br>
  select colors or color ranges, and this tool will<br>
  show which pairs have a chance to produce selected colors.<br><br>
  
  <div class="text-bold">Details<br>
  </div>
  
  There's dropdowns for primary, secondary, and tertiary<br>
  colors. Choosing a second color will turn it into a range<br>
  search. <b>The order matters.</b> For example, if the 1st<br>
  color is Blue and 2nd color is Green, it'll search color ranges<br>
  in between, as in the color wheel, Green is further down than Blue.<br>
  If the first color is Green and 2nd color is Blue,<br>
  it will search for all colors except between Green and Blue.<br>
  <br>
  Distance is the number of colors that you may get that's not<br>
  in the desired ranges. It could also refer as the longest<br>
  "distance" from a dragon's color to the desired colors.<br>
  For example, Maize is 1 distance away from Cream and 2 distance<br>
  away from Antique. If you search for Maize in primary color and set<br>
  maximum distance of 1, dragons with Cream primary are selected<br>
  to pair with Maize primary dragons, but Antique primary dragons are<br>
  not selected. Distance is added for both dragons in a pair.<br><br>
  
  <textarea v-model="textStuff" placeholder="Copy Paste Dragon data here." style="color:#777; width:90%;"></textarea><br>
  
  <div class="cols">
	<div class="col">
		<label>Primary Color:</label><br>
		<select class="colorDropdown" id="prim1" v-model="prim1">
			<option selected value="-1">-</option>
			<option v-for="(color, idx) in colors" :value="idx">{{ color }}</option>
		</select><br>
		<select class="colorDropdown" id="prim2" v-model="prim2">
			<option selected value="-1">-</option>
			<option v-for="(color, idx) in colors" :value="idx">{{ color }}</option>
		</select>
	</div>
	<div class="col">
		<label>Secondary Color:</label><br>
		<select class="colorDropdown" id="sec1" v-model="sec1">
			<option selected value="-1">-</option>
			<option v-for="(color, idx) in colors" :value="idx">{{ color }}</option>
		</select><br>
		<select class="colorDropdown" id="sec2" v-model="sec2">
			<option selected value="-1">-</option>
			<option v-for="(color, idx) in colors" :value="idx">{{ color }}</option>
		</select>
	</div>
	<div class="col">
		<label>Tertiary Color:</label><br>
		<select class="colorDropdown" id="tert1" v-model="tert1">
			<option selected value="-1">-</option>
			<option v-for="(color, idx) in colors" :value="idx">{{ color }}</option>
		</select><br>
		<select class="colorDropdown" id="tert2" v-model="tert2">
			<option selected value="-1">-</option>
			<option v-for="(color, idx) in colors" :value="idx">{{ color }}</option>
		</select>
	</div>
  </div>
  
  Max distance: 
  <select id="dist" v-model="dist">
	<option v-for="i in computeRange" :value="i">{{ i }}</option>
  </select><br>
  <br>
  
  <button @click="generate">Generate</button><br><br>
  <p class="results">{{ results }}</p>
  
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
}
.cols {
	display: flex;
	justify-content: space-between;
	padding-bottom: 20px;
}
.col {
	padding: 5px;
}
.results {
	white-space: pre-line;
}
.colorDropdown {
	width: 125px;
}
ul {
	margin-bottom: 0;
}
</style>

<script>
import COLORS from "@/data/colors.js";
import ANCIENTS from "@/data/ancients.js";

const n_colors = 177;

function distNum(a, b) {
	if (a == b) return 0;
	
	let x, y;
	if (a < b) {
		x = b - a;
		y = n_colors + a - b;
	} else { //a > b
		x = a - b;
		y = n_colors + b - a;
	}
	return ( x < y ? x : y);
}

function validColor(u, l, t) {
	let d = distNum(u, l);
	if (u + d == l) { //no looping
		return (u <= t && t <= l);
	} else { //looping
		return (t <= u || t >= l);
	}
}

function validRange(u, l, t1, t2) { //t1 always upper
	let d = distNum(u, l);
	if (u + d == l) { //no looping
		return !( (t1 <= u && t2 <= u) || (t1 >= l && t2 >= l) );
	} else { //looping
		return !(t1 >= u && t2 <= l);
	}
}

function inverseDist(a) {
	return n_colors - a;
}

function checkColors(m, f, target1, target2, dist) {
	let totaldist;
	let upper, lower;
	let d = distNum(m, f);
	if (m <= f) {
		if (m + d == f) { //no looping
			upper = m;
			lower = f;
		} else { //looping
			upper = f;
			lower = m;
		}
	} else { //m > f
		if (f + d == m) { //no looping
			upper = f;
			lower = m;
		} else { //looping
			upper = m;
			lower = f;
		}
	}
	
	if (target1 == -1) return [true, 0];
	if (target2 == -1) { //single color
		if (!validColor(upper, lower, target1)) return [false, 0];
		else {
			totaldist = distNum(upper, target1) + distNum(lower, target1);
		}
	} else { //range colors
		if (!validRange(upper, lower, target1, target2)) return [false, 0];
		else {
			if (target1 < target2) { //no looping
				if (target1 <= upper && upper <= target2) { //upper in target range
					if (target1 <= lower && lower <= target2) { //both in target range
						if (upper < lower) {
							return [true, 0];
						} else {
							totaldist = distNum(target1, target2);
						}
					} else { //only upper in target range
						totaldist = distNum(lower, target2);
					}
				} else if (target1 <= lower && lower <= target2) { //only lower in target range
					totaldist = distNum(upper, target1);
				} else { //neither are in target range
					totaldist = distNum(upper, target1) + distNum(lower, target2);
				}
			} else { //looping
				if (target1 <= upper || upper <= target2) { //upper in target range
					if (target1 <= lower || lower <= target2) {
						if (upper <= target2 && lower >= target1) {
							totaldist = distNum(target1, target2);
						} else {
							return [true, 0];
						}
					} else { //only upper in target range
						totaldist = distNum(lower, target2);
					}
				} else if (target1 <= lower || lower <= target2) { //only lower in target range
					totaldist = distNum(upper, target1);
				} else { //neither are in target range
					totaldist = distNum(upper, target1) + distNum(lower, target2);
				}
			}
		}
	}
	return [(totaldist <= dist), totaldist];
}

export default {
	data() {
		return {
			results: '',
			textStuff: '',
			
			colors: COLORS.map(color => {
				return color.name[0].toUpperCase() + color.name.slice(1);
				}),
			
			prim1: -1,
			prim2: -1,
			sec1: -1,
			sec2: -1,
			tert1: -1,
			tert2: -1,
			
			dist: 8,
		};
	},
	head() {
		return {
			title: "Color Range Finder",
		};
	},
	computed: {
		computeRange() {
			return Array.from({length: 264}, (_, idx) => idx);
		},
	},
	methods: {
		generate() {
			try {
				let dragonData = this.convertDataToArray(this.textStuff);
				let results = this.findPairs(dragonData);
				//format the arrays
				if (!results.length) this.results = "No pairs found!";
				else {
					let str = "";
					results.forEach(result => {
						str += result[0] + " (#" + result[1] + ") X " + result[2] + " (#" + result[3] + ") || Total Distance: " + result[4] + '\n'; 
					});
					this.results = str;
				}
			} catch (e) {
				alert("Something went wrong. Maybe incomplete pasted data?");
			}
		},
		convertDataToArray(t) {
			let rows = t.split('\n');
			for (let i = 0; i < rows.length; i++) {
				rows[i] = rows[i].split('\t');
				//gender
				rows[i][1] = (rows[i][1] == "Male" ? 1 : 0)
				//transform colors to numbers
				rows[i][3] = this.colors.indexOf(rows[i][3]);
				rows[i][5] = this.colors.indexOf(rows[i][5]);
				rows[i][7] = this.colors.indexOf(rows[i][7]);
				//baby
				rows[i][12] = (rows[i][12] == "Yes" ? 1 : 0)
			}
			return rows;
		},
		findPairs(data) {
			//col 0 is name
			//col 1 is isMale
			//col 2 is breed
			//col 3, 5, 7 are prim, sec, and tert
			//col 12 is baby?
			//col 14 is ID
			let pairs = [];
			
			//sort by male and female
			let males = [];
			let females = [];
			for (let i = 0; i < data.length; i++) {
				if (data[i][12] == 0) {
					if (data[i][1] == 1) males.push(data[i]);
					else females.push(data[i]); //if (data[i][1] == 0)
				}
			}
			
			//dragon pairing typical search
			for (let i = 0; i < males.length; i++) {
				for (let j = 0; j < females.length; j++) {
					if (this.validateBreed(males[i][2], females[j][2])) {
						let [b, dist1] = checkColors(males[i][3], females[j][3], this.prim1, this.prim2, this.dist);
						if (b) {
							let [b, dist2] = checkColors(males[i][5], females[j][5], this.sec1, this.sec2, this.dist);
							if (b && (dist1+dist2 <= this.dist)) {
								let [b, dist3] = checkColors(males[i][7], females[j][7], this.tert1, this.tert2, this.dist);
								if (b && (dist1+dist2+dist3 <= this.dist)) {
									pairs.push([males[i][0], males[i][14], females[j][0], females[j][14], (dist1+dist2+dist3)]);
								}
							}
						}
					}
				}
			}
			
			return pairs;
		},
		validateBreed(m, f) {
			if (ANCIENTS.includes(m) || ANCIENTS.includes(f))
				return (m == f);
			else
				return true;
		},
	}
}
</script>
