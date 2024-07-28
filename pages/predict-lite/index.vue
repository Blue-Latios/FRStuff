<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  Predict Morphology, but it generates links to scry images<br>
  instead of the images themselves.<br><br>
  
  <div class="text-bold">Details<br>
  </div>
  
  Similar to <a target="_blank" rel="noopener noreferrer" href="https://www1.flightrising.com/scrying/predict">Predict Morphology</a>, with some things less,<br<
  but with other features that the site does not have.<br>
  For example, you can choose the genes first instead of breed. No more<br>
  having to choose the genes again across 5+ different ancient breeds.<br>
  This tool also allows you to see which breeds have desired gene<br>
  combos. To select breed links to show, click on the buttons.<br>
  Orange buttons mean the gene combo selected is not available<br>
  on those breeds. Press the R buttons to randomize.<br><br>
  
  Optionally, you can go to a dragon's page and select all (Ctrl+A),<br>
  copy (Ctrl+C), then click on the box below and paste (Ctrl+V)<br>
  to input some options.<br>
  You can also copy a dragon scry link and paste it into the box.<br>
  The "Limit Genes to Selection" button disables genes unavailable <br>
  outside of the selected breeds. Click Generate Links to make<br>
  Predict Morphology links that shows the scry images.<br><br>
  
  Paste page/link here:<br>
  <textarea class="ta" placeholder="Copy Paste here." @paste="htmlPaste" style="width:90%;"></textarea><br>
  
  <div class="cols">
	<div class="col">
		<label>Gender</label>
		<button class="r" @click="r_gender()">R</button><br>
		<select class="dropdown" id="gender" v-model="gender">
			<option v-for="(val, key) in gender_list" :value="val">{{ key }}</option>
		</select>
	</div>
	<div class="col">
		<label>Age</label>
		<button class="r" @click="r_age()">R</button><br>
		<select class="dropdown" id="age" v-model="age">
			<option v-for="(val, key) in age_list" :value="val">{{ key }}</option>
		</select>
	</div>
	<div class="col">
		<label>Element</label>
		<button class="r" @click="r_element()">R</button><br>
		<select class="dropdown" id="element" v-model="element">
			<option v-for="(val, key) in element_list" :value="val">{{ key }}</option>
		</select>
	</div>
	<div class="col">
		<label>Eye Type</label>
		<button class="r" @click="r_eye()">R</button><br>
		<select class="dropdown" id="eye" v-model="eye">
			<option v-for="(val, key) in eye_list" :value="val">{{ key }}</option>
		</select>
	</div>
  </div>
  <div class="cols">
	<div class="col">
		<label>Primary Color</label>
		<button class="r" @click="r_pc()">R</button><br>
		<select class="dropdown" id="prim_c" v-model="prim_c">
			<option v-for="(val, key) in colors" :value="val">{{ key }}</option>
		</select><br><br>
		<label>Primary Gene</label>
		<button class="r" @click="r_pg()">R</button><br>
		<select class="dropdown" id="prim_g" v-model="prim_g">
			<option v-for="val in prim_genes" :value="val" :disabled="check_gene_disabled(val, 1)">{{ val }}</option>
		</select>
	</div>
	<div class="col">
		<label>Secondary Color</label>
		<button class="r" @click="r_sc()">R</button><br>
		<select class="dropdown" id="sec_c" v-model="sec_c">
			<option v-for="(val, key) in colors" :value="val">{{ key }}</option>
		</select><br><br>
		<label>Secondary Gene</label>
		<button class="r" @click="r_sg()">R</button><br>
		<select class="dropdown" id="sec_g" v-model="sec_g">
			<option v-for="val in sec_genes" :value="val" :disabled="check_gene_disabled(val, 2)">{{ val }}</option>
		</select>
	</div>
	<div class="col">
		<label>Tertiary Color:</label>
		<button class="r" @click="r_tc()">R</button><br>
		<select class="dropdown" id="tert_c" v-model="tert_c">
			<option v-for="(val, key) in colors" :value="val">{{ key }}</option>
		</select><br><br>
		<label>Tertiary Gene:</label>
		<button class="r" @click="r_tg()">R</button><br>
		<select class="dropdown" id="tert_g" v-model="tert_g">
			<option v-for="val in tert_genes" :value="val" :disabled="check_gene_disabled(val, 3)">{{ val }}</option>
		</select>
	</div>
  </div>
  
  <button v-for="(item, idx) in modern_list" :key="item.value"
      :class="buttonClass(item)" 
      @click="toggle_m(idx)" 
      :disabled="check_disabled(item)">
      {{ item.name }}
  </button>
  <br><br>
  <button v-for="(item, idx) in ancient_list" :key="item.value"
      :class="buttonClass(item)" 
      @click="toggle_a(idx)" 
      :disabled="isDisabled(item)">
      {{ item.name }}
  </button>
  
  <br><br>
  <button @click="select_all">Select All Breeds</button>
  <button @click="deselect_all">Deselect All Breeds</button>
  <button @click="limit_genes" :class="limit_class">Limit Genes to Selection</button><br><br>
  
  <button style="background-color: #757adb; color: white" @click="generate">Generate Links</button><br><br>
  <p class="results" v-html="results"></p>
  
  <hr>
  <div class="footnote" style="font-size: 10px;"><a target="_blank" rel="noopener noreferrer" href="https://www1.flightrising.com/forums/gde/3269795">Tool thread</a><br>
  Tool by BlueLatios.</div>
</div></template>

<style>
.container {
	padding: 10px;
	margin: 5px;
	font-size: 14px;
	width: 640px;
}
.text-bold {
	font-weight: bold;
	font-size: 20px;
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
	line-height:1.0;
}
.dropdown {
	width: 125px;
}
ul {
	margin-bottom: 0;
}
.on {
	background-color: blue;
	color: white;
}
.off {
	background-color: white;
	color: black;
}
.disabled {
	background-color: orange;
	color: white;
	cursor: not-allowed;
}
.r {
	background-color: gray;
	color: #b3c2fd;
	font-weight: bold;
}
.ta {
	background-color: transparent;
	color: transparent;
}
</style>

<script>
const HTMLParser = require('node-html-parser');

import SCRY from "@/data/scry.js";

const start_s = "https://www1.flightrising.com/scrying/predict?";

function rand(min, max) {
	return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

export default {
	data() {
		return {
			results: '',
			anytext: '',
			
			colors: SCRY["colors"],
			prim_c: "21",
			sec_c: "21",
			tert_c: "21",
			
			gender_list: SCRY["gender"],
			gender: "0",
			age_list: SCRY["age"],
			age: "1",
			element_list: SCRY["element"],
			element: "3",
			eye_list: SCRY["eye_type"],
			eye: "0",
			
			prim_genes: SCRY["prim_genes"],
			prim_g: "Basic",
			sec_genes: SCRY["sec_genes"],
			sec_g: "Basic",
			tert_genes: SCRY["tert_genes"],
			tert_g: "Basic",
			
			g_id: SCRY["breeds"],
			
			modern_list: Object.keys(SCRY["modern_list"]).map(
			item=>({
				name: item,
				value: SCRY["modern_list"][item],
				isOn: false,
			})),
			ancient_list: Object.keys(SCRY["ancient_list"]).map(
			item=>({
				name: item,
				value: SCRY["ancient_list"][item],
				isOn: false,
			})),
			
			limit: false,
		};
	},
	head() {
		return {
			title: "Predict Morphology Lite",
		};
	},
	computed: {
		computeRange() {
			return Array.from({length: 177}, (_, idx) => idx);
		},
		isDisabled() {
			return (item) => {
				return this.check_disabled(item);
			};
		},
		buttonClass() {
			  return (item) => {
				if (this.check_disabled(item)) {
					item.isOn = false;
					return 'disabled';
				}
				if (!item.isOn) return 'off';
				return 'on';
			  };
		},
		limit_class() {
			if (this.limit) return 'on';
			return 'off';
		},
		check_gene_disabled() {
			return (x, y) => {
				let modern_already = false;
				for (let breed in this.g_id) {
					let b = {};
					b.name = breed;
					if (!(b.name == "Modern" && modern_already)) {
						if (b.name == "Modern") modern_already=true;
						if ((this.limit ? this.check_on(breed) : !this.check_disabled(b, y))) {
							if (Object.keys(this.g_id[breed]).includes(x)) {
								return false;
							}
						}
					}
				}
				return true;
			}
		},
	},
	methods: {
		conv(breed) {
			if (this.modern_list.map(x => x.name).includes(breed)) return "Modern";
			return breed;
		},
		check_disabled(x, y=0) {
			let name = this.conv(x.name);
			return (!((y == 1 ? true : this.prim_g in this.g_id[name]) && (y == 2 ? true : this.sec_g in this.g_id[name]) && (y == 3 ? true : this.tert_g in this.g_id[name])));
		},
		check_on(breed) {
			if (breed == "Modern") {
				let m = this.modern_list.filter(x => x.isOn);
				if (m.length > 0) return true;
				else return false;
			} else {
				let a = this.ancient_list.filter(x => x.name == breed).map(x => x.isOn);
				return a[0];
			}
		},
		toggle_m(x) {
		  if (!this.modern_list[x].isDisabled) {
			this.modern_list[x].isOn = !this.modern_list[x].isOn;
		  }
		},
		toggle_a(x) {
		  if (!this.ancient_list[x].isDisabled) {
			this.ancient_list[x].isOn = !this.ancient_list[x].isOn;
		  }
		},
		select_all() {
			for (const x in this.modern_list) {
				if (!this.check_disabled(this.modern_list[x])) this.modern_list[x].isOn = true;
			}
			for (const x in this.ancient_list) {
				if (!this.check_disabled(this.ancient_list[x])) this.ancient_list[x].isOn = true;
			}
		},
		deselect_all() {
			for (const key in this.modern_list) {
				this.modern_list[key].isOn = false;
			}
			for (const key in this.ancient_list) {
				this.ancient_list[key].isOn = false;
			}
		},
		limit_genes() {
			this.limit = !this.limit;
		},
		get_id(breed, gene) {
			return this.g_id[this.conv(breed)][gene];
		},
		get_id_from(s, id) {
			for (const [main, sub] of Object.entries(this.g_id))
				for (const [key, value] of Object.entries(sub)) {
					if (value === id) {
						switch (s) {
							case 0:
								if (this.prim_genes.includes(key)) return key; 
							break;
							case 1:
								if (this.sec_genes.includes(key)) return key;
							break;
							case 2:
								if (this.tert_genes.includes(key)) return key;
							break;
							default:
								alert("Bad switch case?");
						}
					}
				}
		},
		generate() {
			try {
				
				let gender = "gender=" + this.gender;
				let age = "&age=" + this.age;
				let element = "&element=" + this.element;
				let eyetype = "&eyetype=" + this.eye;
				let body = "&body=" + this.prim_c.toString();
				let wings = "&wings=" + this.sec_c.toString();
				let tert = "&tert=" + this.tert_c.toString();
				
				let breeds = [...this.modern_list.filter(x => x.isOn).map(x => [x.name, x.value]),
				...this.ancient_list.filter(x => x.isOn).map(x => [x.name, x.value])];
				
				let s = "<font size=5><b>Dragon Links</b></font>";
				
				breeds.forEach((x) => {
					let name = x[0];
					
					let breed = "&breed=" + x[1];
					let bodygene = "&bodygene=" + this.get_id(name, this.prim_g);
					let winggene = "&winggene=" + this.get_id(name, this.sec_g);
					let tertgene = "&tertgene=" + this.get_id(name, this.tert_g);
					
					let k = start_s + gender + age + element + eyetype + body + wings + tert + breed + bodygene + winggene + tertgene;
					s += "\n\n<b><font size=4>" + name + '</font></b>\n<font size=1><a target="_blank" rel="noopener noreferrer" href=' + k + ">" + k + "</a></font>";
				});
				
				this.results = s;
			} catch(e) {
				alert("Something went wrong...");
			}
		},
		htmlPaste(e) {
			let pastedText = '';
			try {
				if (window.clipboardData && window.clipboardData.getData) { // IE
					pastedText = window.clipboardData.getData('Text'); //unresolved
					alert('May not work in Internet Explorer');
					this.processPage(pastedText);
				} else if (e.clipboardData && e.clipboardData.getData) {
					if (e.clipboardData.types.includes('text/html')) {
						pastedText = e.clipboardData.getData('text/html');
						this.processPage(pastedText);
					} else {
						pastedText = e.clipboardData.getData('text/plain');
						this.processLink(pastedText);
					}
				}
			} catch(e) {
				alert('Error! Not valid pasted data.');
			}
		},
		processLink(url) {
			this.gender = url.match(/gender=([^&]*)/)[1];
			this.age = url.match(/age=([^&]*)/)[1];
			this.prim_c = url.match(/body=([^&]*)/)[1];
			this.sec_c = url.match(/wings=([^&]*)/)[1];
			this.tert_c = url.match(/tert=([^&]*)/)[1];
			
			this.prim_g = this.get_id_from(0, url.match(/bodygene=([^&]*)/)[1]);
			this.sec_g = this.get_id_from(1, url.match(/winggene=([^&]*)/)[1]);
			this.tert_g = this.get_id_from(2, url.match(/tertgene=([^&]*)/)[1]);
			
			this.element = url.match(/element=([^&]*)/)[1];
			this.eye = url.match(/eyetype=([^&]*)/)[1];
			
			let breedId = url.match(/breed=([^&]*)/)[1];
			let item = this.modern_list.find(obj => obj.value === breedId);
			if (item) item.isOn = true;
			else {
				item = this.ancient_list.find(obj => obj.value === breedId);
					if (item) item.isOn = true;
					else alert("Breed not found?");
			}
		},
		processPage(t) {
			try {
				const r = HTMLParser.parse(t);
				
				this.gender = (r.querySelector(`span[data-tooltip-source="#dragon-profile-icon-sex-tooltip"]`).querySelector("img").getAttribute("src").match(/\/([^/]+)\.png$/)[1] == "male" ? 0 : 1);
				this.age = (r.querySelector(`span[data-tooltip-source="#dragon-profile-icon-eternal-youth-tooltip"]`) ? "0" : "1");
				
				const phys = r.querySelector("#dragon-profile-physical");
				const iconvalues = phys.querySelectorAll(".dragon-profile-stat-icon-value");
				
				this.prim_c = this.colors[iconvalues[0].childNodes[0].text.trim()];
				this.sec_c = this.colors[iconvalues[1].childNodes[0].text.trim()];
				this.tert_c = this.colors[iconvalues[2].childNodes[0].text.trim()];
				
				this.prim_g = iconvalues[0].querySelector("strong").text.split(" (")[0];
				this.sec_g = iconvalues[1].querySelector("strong").text.split(" (")[0];
				this.tert_g = iconvalues[2].querySelector("strong").text.split(" (")[0];
				
				this.element = this.element_list[iconvalues[5].childNodes[0].text.trim()];
				this.eye = this.eye_list[iconvalues[5].querySelector("strong").text];
				
				let breed = iconvalues[4].querySelector("strong").text;
				let item = this.modern_list.find(obj => obj.name === breed);
				if (item) item.isOn = true;
				else {
					item = this.ancient_list.find(obj => obj.name === breed);
						if (item) item.isOn = true;
						else alert("Breed not found?");
				}

			} catch(e) {
				alert('Not valid dragon data?');
			}
		},
		r_gender() {
			this.gender = rand(0,1);
		},
		r_age() {
			this.age = rand(0,1);
		},
		r_element() {
			this.element = rand(1,Object.keys(this.element_list).length);
		},
		r_eye() {
			this.eye = rand(0,Object.keys(this.eye_list).length-1);
		},
		r_tc() {
			this.tert_c = rand(1,177);
		},
		r_pg() {
			let l = this.prim_genes.filter(x => !this.check_gene_disabled(x, 1));
			if (l.length == 0) this.prim_g = "Basic";
			else this.prim_g = l[rand(0,l.length-1)];
		},
		r_pc() {
			this.prim_c = rand(1,177);
		},
		r_sg() {
			let l = this.sec_genes.filter(x => !this.check_gene_disabled(x, 2));
			if (l.length == 0) this.sec_g = "Basic";
			else this.sec_g = l[rand(0,l.length-1)];
		},
		r_sc() {
			this.sec_c = rand(1,177);
		},
		r_tg() {
			let l = this.tert_genes.filter(x => !this.check_gene_disabled(x, 3));
			if (l.length == 0) this.tert_g = "Basic";
			else this.tert_g = l[rand(0,l.length-1)];
		},
	}
}
</script>
