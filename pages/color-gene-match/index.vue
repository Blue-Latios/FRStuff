<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  Color gene matcher, shows a list of genes and<br>
  their accent colors.<br><br>
  
  <div class="text-bold">Details<br>
  </div>
  
  Honestly, just my take on implementing xCorbeau's tool.<br>
  For now, it just displays data already in their tool.<br><br>
  
  You can go to a dragon's page and select all (Ctrl+A),<br>
  copy (Ctrl+C), then click on the box below and paste (Ctrl+V)<br>
  to input the colors automatically.<br>
  You can also copy a dragon scry link and paste it into the box.<br>
  Click breeds to fade out genes unavailable for selected breeds.<br>
  Press the R buttons to randomize colors.<br><br>
  
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
    <label>Primary Color</label>
    <button class="r" @click="r_pc()">R</button><br>
    <select class="dropdown" id="prim_c" v-model="prim_c">
      <option v-for="(val, key) in colors" :value="key">{{ key }}</option>
    </select>
  </div>
  <div class="col">
    <label>Secondary Color</label>
    <button class="r" @click="r_sc()">R</button><br>
    <select class="dropdown" id="sec_c" v-model="sec_c">
      <option v-for="(val, key) in colors" :value="key">{{ key }}</option>
    </select>
  </div>
  <div class="col">
    <label>Tertiary Color:</label>
    <button class="r" @click="r_tc()">R</button><br>
    <select class="dropdown" id="tert_c" v-model="tert_c">
      <option v-for="(val, key) in colors" :value="key">{{ key }}</option>
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
  color: #000;
}
.detailTable tr td, .detailTable tr th {
  border: 1px solid black;
  padding: 6px;
  background: white;
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
      prim_c: "Blue",
      sec_c: "Blue",
      tert_c: "Blue",
      compact: true,
      
      g_id: SCRY["breeds"],
      
      modern_list: [{
          name: "Modern",
          isOn: false,
      }],
      ancient_list: Object.keys(SCRY["ancient_list"]).map(
        item=>({
          name: item,
          isOn: false,
      })),
    };
  },
  head() {
    return {
      title: "Color-Gene Match Helper",
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
    prim_c() { this.generate(); },
    sec_c() { this.generate(); },
    tert_c() { this.generate(); },
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
      let p = this.generateDetailed(this.prim_c, 1, this.mappings);
      let s = this.generateDetailed(this.sec_c, 2, this.mappings);
      let t = this.generateDetailed(this.tert_c, 3, this.mappings);
      
      return p + "\n" + s + "\n" + t;
    },
    generateDetailed(colorName, mode, mapping) {
      let out = "";
      const baseHex = this.base[lower(colorName)]["hex"];
      let title;
      if (mode == 1) title = "PRIMARY";
      else if (mode == 2) title = "SECONDARY";
      else title = "TERTIARY";
      //out += "<b>" + title + "</b></td><td style='border:1px solid; padding:4px;'>Base Color " + colorBox(baseHex) + " " + baseHex + "</td></tr></table><br>";
      out += "<table class='detailTable' style='border: 5px solid #ddd; background:" + baseHex + "'>";
      
      out += "<tr><th style='width:160px;'><span class='detailText'>" + title + " GENE</span></th>";
      for (let i = 1; i <= 6; i++) {
        out += "<th><span class='detailText'>ACCENT " + i + "</span></th>";
      }
      out += "</tr>";
      
      let geneList;
      if (mode == 1) { //prim
        geneList = mapping["prim_genes"];
      } else if (mode == 3) { //tert
        geneList = mapping["tert_genes"];
      } else { //sec, mode == 2
        geneList = mapping["sec_genes"]
      }
      for (let g of geneList) {
        let gene = (mode != 2) ? g : mapping["mapping"][g];
        let accents = this.colors[colorName][gene];
        if (!accents) continue;
        
        out += `<tr class="${this.check_gene_disabled(g) ? 'disableGene' : ''}">`;        
        out += "<td><span class='detailText'>" + g + "</span></td>";
        for (let hex of accents) {
          out += "<td class='hexText'>" + colorBox(hex) + " <span class='detailText'>" + hex.slice(1) + "</span></td>";
        }
        out += "</tr>";
      }
      out += "</table></br>";
      return out;
    },
    getGeneRows(colorName, mode) {
      let rows = [];
      let mapping = this.mappings;
      //rows.push("<div>Base Color " + colorBox(this.base[lower(colorName)]["hex"]) + "</div>");
      

      let geneList;
      if (mode == 1) geneList = mapping["prim_genes"];
      else if (mode == 2) geneList = mapping["sec_genes"];
      else geneList = mapping["tert_genes"];

      for (let g of geneList) {
        let gene = (mode == 2) ? mapping["mapping"][g] : g;
        let accents = this.colors[colorName][gene];
        if (!accents) continue;

        let row = `<div class="${this.check_gene_disabled(g) ? 'disableGene2' : ''}"><span style='padding-left:3px; padding-right:3px; background:white; border-radius: 4px;'>` + g + "</span> ";
        for (let hex of accents) {
          row += colorBox(hex);
        }
        row += "</div>";

        rows.push(row);
      }

      return rows;
    },
    generateCompact() {
      let p = this.getGeneRows(this.prim_c, 1);
      let s = this.getGeneRows(this.sec_c, 2);
      let t = this.getGeneRows(this.tert_c, 3);

      let maxRows = Math.max(p.length, s.length, t.length);

      let html = "<table style='border-collapse:collapse; table-layout:fixed; width:680px;'>";
      let colorString = "";
      let baseHex1 = this.base[lower(this.prim_c)]["hex"];
      let baseHex2 = this.base[lower(this.sec_c)]["hex"];
      let baseHex3 = this.base[lower(this.tert_c)]["hex"];
      
      for (let i = 0; i < maxRows; i++) {
        html += "<tr>";
        
        colorString = "background: " + baseHex1 + ";";
        html += "<td style='padding:6px; vertical-align:top;" + colorString + `'>` + (p[i] || "") + "</td>";
        
        colorString = "background: " + baseHex2 + ";";
        html += "<td style='padding:6px; vertical-align:top; " + colorString + `'>` + (s[i] || "") + "</td>";
        
        colorString = "background: " + baseHex3 + ";";
        html += "<td style='padding:6px; vertical-align:top;" + colorString + `'>` + (t[i] || "") + "</td>";

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
      this.prim_c = findColor(url.match(/body=([^&]*)/)[1]);
      this.sec_c = findColor(url.match(/wings=([^&]*)/)[1]);
      this.tert_c = findColor(url.match(/tert=([^&]*)/)[1]);
      
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
        
        this.prim_c = iconvalues[0].childNodes[0].text.trim();
        this.sec_c = iconvalues[1].childNodes[0].text.trim();
        this.tert_c = iconvalues[2].childNodes[0].text.trim();
        
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
