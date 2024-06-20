<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  Predict Morphology, but it generates links to scry images<br>
  instead of the images themselves.<br><br>
  
  <div class="text-bold">Details<br>
  </div>
  
  Similar to <a target="_blank" rel="noopener noreferrer" href="https://www1.flightrising.com/scrying/predict">Predict Morphology</a>, with some things<br>
  less, and other things more.<br>
  For example, you can choose the genes first instead of breed. No more<br>
  having to choose the genes again across 5+ different ancient breeds.<br>
  This tool also allows you to see which breeds have this gene<br>
  combo. To select breed links to show, click on the buttons.<br>
  Orange buttons mean that the gene combo selected is not available<br>
  on those breeds.<br><br>
  
  
  <div class="cols">
	<div class="col">
		<label>Gender</label><br>
		<select class="dropdown" id="gender" v-model="gender">
			<option v-for="(val, key) in gender_list" :value="val">{{ key }}</option>
		</select>
	</div>
	<div class="col">
		<label>Age</label><br>
		<select class="dropdown" id="age" v-model="age">
			<option v-for="(val, key) in age_list" :value="val">{{ key }}</option>
		</select>
	</div>
	<div class="col">
		<label>Element</label><br>
		<select class="dropdown" id="elem" v-model="elem">
			<option v-for="(val, key) in elem_list" :value="val">{{ key }}</option>
		</select>
	</div>
	<div class="col">
		<label>Eye Type</label><br>
		<select class="dropdown" id="eye" v-model="eye">
			<option v-for="(val, key) in eye_list" :value="val">{{ key }}</option>
		</select>
	</div>
  </div>
  <div class="cols">
	<div class="col">
		<label>Primary Color</label><br>
		<select class="dropdown" id="prim_c" v-model="prim_c">
			<option v-for="(val, key) in colors" :value="val">{{ key }}</option>
		</select><br><br>
		<label>Primary Gene</label><br>
		<select class="dropdown" id="prim_g" v-model="prim_g">
			<option v-for="val in prim_genes" :value="val">{{ val }}</option>
		</select>
	</div>
	<div class="col">
		<label>Secondary Color</label><br>
		<select class="dropdown" id="sec_c" v-model="sec_c">
			<option v-for="(val, key) in colors" :value="val">{{ key }}</option>
		</select><br><br>
		<label>Secondary Gene</label><br>
		<select class="dropdown" id="sec_g" v-model="sec_g">
			<option v-for="val in sec_genes" :value="val">{{ val }}</option>
		</select>
	</div>
	<div class="col">
		<label>Tertiary Color:</label><br>
		<select class="dropdown" id="tert_c" v-model="tert_c">
			<option v-for="(val, key) in colors" :value="val">{{ key }}</option>
		</select><br><br>
		<label>Tertiary Gene:</label><br>
		<select class="dropdown" id="tert_g" v-model="tert_g">
			<option v-for="val in tert_genes" :value="val">{{ val }}</option>
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
  <button @click="deselect_all">Deselect All Breeds</button><br><br>
  
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
</style>

<script>
import SCRY from "@/data/scry.js";

const start_s = "https://www1.flightrising.com/scrying/predict?";

export default {
	data() {
		return {
			results: '',
			
			colors: SCRY["colors"],
			prim_c: 21,
			sec_c: 21,
			tert_c: 21,
			
			gender_list: SCRY["gender"],
			gender: "0",
			age_list: SCRY["age"],
			age: "1",
			elem_list: SCRY["element"],
			elem: "3",
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
	},
	methods: {
		conv(breed) {
			if (this.modern_list.map(x => x.name).includes(breed)) return "Modern";
			return breed;
		},
		check_disabled(x) {
			name = this.conv(x.name);
			return (!(this.prim_g in this.g_id[name] && this.sec_g in this.g_id[name] && this.tert_g in this.g_id[name]));
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
		get_id(breed, gene) {
			return this.g_id[this.conv(breed)][gene];
		},
		generate() {
			
				
				let gender = "gender=" + this.gender;
				let age = "&age=" + this.age;
				let element = "&element=" + this.elem;
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
				
		},
	}
}
</script>
