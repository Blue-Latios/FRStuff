<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  Select a gene, see all the accent colors that<br>
  a gene could have.<br><br>
  
  <div class="text-bold">Details<br>
  </div>
  
  Sibling of the other tool.<br>
  Instead of choosing colors, choose genes.<br><br>
  
  Paste page/link here:<br>
  <textarea class="ta" placeholder="Copy Paste here." @paste="htmlPaste"></textarea><br><br>
  
  <button @click="compact = !compact">{{ toggleText }}</button><br><br>
  
  <button v-for="(item, idx) in modern_list" :key="item.value"
      :class="buttonClass(item)" 
      @click="toggle_m(idx)">
      {{ item.name }}
  </button>&nbsp;
  <button @click="deselect_all">Deselect All Breeds</button>
  <br><br>
  <button v-for="(item, idx) in ancient_list" :key="item.value"
      :class="buttonClass(item)" 
      @click="toggle_a(idx)">
      {{ item.name }}
  </button>
  <br>
  <br>
  <div class="cols">
  <div class="col">
    <label>Primary Gene</label>
    <button class="r" @click="r_pc()">R</button><br>
    <select class="dropdown" id="prim_c" v-model="prim_g">
      <option v-for="gene in mappings.prim_genes" :value="gene">{{ gene }}</option>
    </select>
  </div>
  <div class="col">
    <label>Secondary Gene</label>
    <button class="r" @click="r_sc()">R</button><br>
    <select class="dropdown" id="sec_c" v-model="sec_g">
      <option v-for="gene in mappings.sec_genes" :value="gene">{{ gene }}</option>
    </select>
  </div>
  <div class="col">
    <label>Tertiary Gene</label>
    <button class="r" @click="r_tc()">R</button><br>
    <select class="dropdown" id="tert_c" v-model="tert_g">
      <option v-for="gene in mappings.tert_genes" :value="gene">{{ gene }}</option>
    </select>
  </div>
  </div>
  
  <p class="results" v-html="results"></p>
  
  <hr>
  <div class="footnote" style="font-size: 10px;"><a target="_blank" rel="noopener noreferrer" href="https://www1.flightrising.com/forums/gde/3384576">Tool thread</a><br>
  Data, sheets tool credits are by xCorbeau and team. Web tool by BlueLatios.</div>
</div></template>

<style>
.container {
  padding: 10px;
  margin: 5px;
  font-size: 14px;
  width: 680px;
  min-width: 680px;
}
.text-bold {
  font-weight: bold;
  font-size: 20px;
}
.cols {
  display: flex;
  column-gap: 20px;
  padding-bottom: 20px;
}
.col {
  padding: 5px;
  flex-shrink: 0;
  flex-grow: 0;
  min-width: 210px;
  text-align: center;
}
.results {
  white-space: pre-line;
  line-height: 16px;
  font-family: monospace;
}
.hexText {
  font-size:10px;
}
.dropdown {
  width: 125px;
}
.r {
  background-color: gray;
  color: #b3c2fd;
  font-weight: bold;
}
.ta {
  background-color: transparent;
  color: transparent;
  width: 680px;
}
.detailText {
  
}
.detailTable tr td, .detailTable tr th {
  border: 1px solid black;
  padding: 6px;
}
.on {
	background-color: blue;
	color: white;
}
.off {
	background-color: white;
	color: black;
}
.disableGene {
  background: white;
}
.disableGene td {
  opacity: 0.2;
}
.disableGene2 {
  opacity: 0.2;
}
</style>

<script>
const HTMLParser = require('node-html-parser');

import DATA from "@/data/gene_colors.json";
import MAP from "@/data/gene_mappings.json";
import BASE from "@/data/colors2.js";
import SCRY from "@/data/scry.js";

const colors_arr = Object.keys(BASE);

function isDark(hex) {
  hex = hex.replace('#', '');
  let r = parseInt(hex.substr(0,2), 16);
  let g = parseInt(hex.substr(2,2), 16);
  let b = parseInt(hex.substr(4,2), 16);

  // perceived brightness
  let brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 140;
}

function randomColor() {
  return colors_arr[Math.floor(Math.random() * (177))];
}

function lower(s) {
  return s.toLowerCase();
}

function titleCase(s) {
  return s.charAt(0).toUpperCase() + s.substring(1).toLowerCase();
}

function findColor(idx) {
  for (const name in SCRY["colors"]) {
    const id = SCRY["colors"][name];
    if (idx == id) {
      return titleCase(name);
    }
  }
}

function colorBox(hex) {
  return `<span style="
    display:inline-block;
    width:16px;
    height:16px;
    background:${hex};
    border:2px solid black;
    border-radius: 4px;
    margin-left: 4px;
    vertical-align:middle;
    position: relative;
    bottom: 1px;
    box-shadow: 0 0 0 1px #fff;
  "></span>`;
}

export default {
  data() {
    return {
      results: '',
      
      colors: DATA,
      mappings: MAP,
      base: BASE,
      prim_g: "Basic",
      sec_g: "Basic",
      tert_g: "Basic",
      compact: true,
      
      g_id: SCRY["breeds"],
      
      modern_list: [{
          name: "Modern",
          isOn: false,
      }],
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
      title: "All Gene Colors",
    };
  },
  computed: {
    toggleText() {
      return this.compact ? "Toggle Detailed View" : "Toggle Compact View";
    },
    buttonClass() {
      return (item) => {
        if (!item.isOn) return 'off';
        return 'on';
      };
    },
    noSelect() {
      return [...this.modern_list, ...this.ancient_list].every(item => item.isOn == false);
    },
    check_gene_disabled() {
			return (x) => {
        if (this.noSelect)
          return false;
        else {
          let modern_already = false;
          for (let breed in this.g_id) {
            let b = {};
            b.name = breed;
            if (!(b.name == "Modern" && modern_already)) {
              if (b.name == "Modern") modern_already=true;
              if (this.check_on(breed)) {
                if (Object.keys(this.g_id[breed]).includes(x)) {
                  return false;
                }
              }
            }
          }
        }
				return true;
			}
		},
  },
  watch: {
    prim_g() { this.generate(); },
    sec_g() { this.generate(); },
    tert_g() { this.generate(); },
    compact() { this.generate(); }
  },
  methods: {
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
			this.modern_list[x].isOn = !this.modern_list[x].isOn;
      this.generate();
		},
		toggle_a(x) {
			this.ancient_list[x].isOn = !this.ancient_list[x].isOn;
      this.generate();
		},
    deselect_all() {
			for (const key in this.modern_list) {
				this.modern_list[key].isOn = false;
			}
			for (const key in this.ancient_list) {
				this.ancient_list[key].isOn = false;
			}
      this.generate();
		},
    generateFull() {
      let p = this.generateDetailed(this.prim_g, 1, this.mappings);
      let s = this.generateDetailed(this.sec_g, 2, this.mappings);
      let t = this.generateDetailed(this.tert_g, 3, this.mappings);
      
      return p + "\n" + s + "\n" + t;
    },
    generateDetailed(geneName, mode, mapping) {
      let out = "";
      let geneRef = (mode == 2) ? this.mappings["mapping"][geneName] : geneName;

      out += "<table class='detailTable' style='border: 5px solid #ddd;'>";
      
      out += "<tr><th style='width:160px;'><span class='detailText'>" + geneName + "</span></th>";
      for (let i = 1; i <= 6; i++) {
        out += "<th><span class='detailText'>ACCENT " + i + "</span></th>";
      }
      out += "</tr>";
      
      for (let color of Object.keys(this.colors)) {
        
        let baseHex = this.base[lower(color)]["hex"];
        let accents = this.colors[titleCase(color)][geneRef] || [];
        
        out += `<tr class="${this.check_gene_disabled(geneName) ? 'disableGene' : ''}" style="background:${baseHex}">`;
        let textColor = isDark(baseHex) ? "#fff" : "#000";
        out += `<td style="vertical-align: middle;background:${baseHex}; color:${textColor}">${titleCase(color)}</td>`;
        for (let i = 0; i < 6; i++) {
          if (accents[i]) {
            let hex = accents[i];
            out += `<td class='hexText' style='color:${textColor}'>` + colorBox(hex) + " <span class='detailText'>" + hex.slice(1) + "</span></td>";
          } else {
            out += "<td></td>";
          }
        }
        out += "</tr>";
      }
      out += "</table><br>";
      return out;
    },
    getColorRows(geneName, mode) {
      let rows = [];
      let geneRef = (mode == 2) ? this.mappings["mapping"][geneName] : geneName;
      for (let color of Object.keys(this.colors)) {
        
        let accents = this.colors[titleCase(color)][geneRef] || [];

        let row = `<div class="${this.check_gene_disabled(geneName) ? 'disableGene2' : ''}"><span style='padding-left:3px; padding-right:3px; background:white; border-radius: 4px;'>`
          + titleCase(color) + "</span> ";

        for (let hex of accents) {
          row += colorBox(hex);
        }
        row += "</div>";

        rows.push(row);
      }

      return rows;
    },
    generateCompact() {
      let p = this.getColorRows(this.prim_g, 1);
      let s = this.getColorRows(this.sec_g, 2);
      let t = this.getColorRows(this.tert_g, 3);

      let maxRows = Math.max(p.length, s.length, t.length);

      let html = "<table style='border-collapse:collapse; table-layout:fixed; width:720px;'>";

      for (let i = 0; i < maxRows; i++) {
        html += "<tr>";
        
        let c1 = (p[i] || "");
        let c2 = (s[i] || "");
        let c3 = (t[i] || "");
        
        let baseHex = this.base[lower(Object.keys(this.colors)[i])]["hex"];
        
        html += "<td style='padding:6px; vertical-align:top; background:" + baseHex + ";'>" + c1 + "</td>";
       
        html += "<td style='padding:6px; vertical-align:top; background:" + baseHex + ";'>" + c2 + "</td>";
        
        html += "<td style='padding:6px; vertical-align:top; background:" + baseHex + ";'>" + c3 + "</td>";

        html += "</tr>";
      }

      html += "</table>";
      return html;
    },
    generate() {
      if (this.compact) {
        this.results = this.generateCompact();
      } else {
        this.results = this.generateFull();
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

			this.prim_g = this.get_id_from(0, url.match(/bodygene=([^&]*)/)[1]);
			this.sec_g = this.get_id_from(1, url.match(/winggene=([^&]*)/)[1]);
			this.tert_g = this.get_id_from(2, url.match(/tertgene=([^&]*)/)[1]);
			
			let breedId = url.match(/breed=([^&]*)/)[1];
			
			let item = Object.values(SCRY["modern_list"]).includes(breedId);
			if (item) this.modern_list[0].isOn = true;
			else {
				item = this.ancient_list.find(obj => obj.value === breedId);
					if (item) item.isOn = true;
					else alert("Breed not found?");
			}
    },
    get_id_from(s, id) {
			for (const [main, sub] of Object.entries(this.g_id))
				for (const [key, value] of Object.entries(sub)) {
					if (value === id) {
						switch (s) {
							case 0:
								if (SCRY["prim_genes"].includes(key)) return key; 
							break;
							case 1:
								if (SCRY["sec_genes"].includes(key)) return key;
							break;
							case 2:
								if (SCRY["tert_genes"].includes(key)) return key;
							break;
							default:
								alert("Bad switch case?");
						}
					}
				}
		},
    processPage(t) {
      try {
        const r = HTMLParser.parse(t);
        
        const phys = r.querySelector("#dragon-profile-physical");
        const iconvalues = phys.querySelectorAll(".dragon-profile-stat-icon-value");
        
				this.prim_g = iconvalues[0].querySelector("strong").text.split(" (")[0];
				this.sec_g = iconvalues[1].querySelector("strong").text.split(" (")[0];
				this.tert_g = iconvalues[2].querySelector("strong").text.split(" (")[0];
				
				let breed = iconvalues[4].querySelector("strong").text;
				let item = Object.keys(SCRY["modern_list"]).includes(breed);
			  if (item) this.modern_list[0].isOn = true;
			  else {
				  item = this.ancient_list.find(obj => obj.name === breed);
					  if (item) item.isOn = true;
					  else alert("Breed not found?");
			  }
      } catch(e) {
        alert('Not valid dragon data?');
      }
    },
    r_tc() {
      let s = randomColor();
      this.tert_c = titleCase(s);
    },
    r_pc() {
      let s = randomColor();
      this.prim_c = titleCase(s);
    },
    r_sc() {
      let s = randomColor();
      this.sec_c = titleCase(s);
    },
  }
}
</script>
