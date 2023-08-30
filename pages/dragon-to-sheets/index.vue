<template>
<div class="container">
  <div class="text-bold">What is this?<br>
  </div>
  Select All on dragon page, copy, paste into box.<br>
  Text comes out, copy that and paste into Google Sheets.<br>
  
  <div class="text-bold">Sheets link:<br>
  </div>
  
  https://docs.google.com/spreadsheets/d/1C_Bsog-brvpPR1ANAhLgegZdtorwwtCUcswm40W7cCc<br><br>
  
  <textarea v-model="textStuff" placeholder="Copy Paste here." @paste="loadDragon" style="width:90%;"></textarea><br>
  <textarea v-model="results" placeholder="Results to copy here." disabled style="width:90%;"></textarea><br>
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
ul {
	margin-bottom: 0;
}
</style>

<script>
const cheerio = require('cheerio');
const moment = require('moment');

function Dragon(data) {
  return {
    data,
    id() {
      return this.data.id;
    },
    name() {
      return this.data.name;
    },
    gender() {
      return this.data.gender;
    },
    breed() {
      return this.data.breed;
    },
    flight() {
      return this.data.flight;
    },
    eyes() {
      return this.data.eyes;
    },
    primaryColor() {
      return this.data.primaryColor;
    },
    primaryGene() {
      return this.data.primaryGene;
    },
    secondaryColor() {
      return this.data.secondaryColor;
    },
    secondaryGene() {
      return this.data.secondaryGene;
    },
    tertiaryColor() {
      return this.data.tertiaryColor;
    },
    tertiaryGene() {
      return this.data.tertiaryGene;
    },
    dateOfBirth() {
      return this.data.dateOfBirth;
    },
    isFirstGen() {
      return this.data.isFirstGen;
    },
    isBred() {
      return this.data.isBred;
    },    
    hasSilhouette() {
      return this.data.hasSilhouette;
    },
    isPermababy() {
      return this.data.isPermababy;
    },
    digits() {
      return Math.ceil(Math.log(this.data.id) / Math.log(10));
    },
  };
}

function removeAncientBreedDescriptor(gene) {
	return gene.split(" (")[0];
}

function importDragonFromDragonBlob($) {
  const stat = (index, take_first) => {
    const item = $('.dragon-profile-stat-icon-value')[index];
    return take_first ? $(item).html().split('<')[0].trim() : $('strong', item).html();
  };

  const idSelector = $('.dragon-profile-header-number').html();
  const dragon = Dragon({
    id: parseInt(idSelector.substr(0, idSelector.length - 1).substr(2)),
    name: $('.dragon-profile-header-name').html(),
    gender: $('[data-tooltip-source="#dragon-profile-icon-sex-tooltip"] img').attr('src').search('female') === -1 ? 'Male' : 'Female',
    isFirstGen: !$('.dragon-profile-lineage-parents a')[0],
    isBred: !!$('.dragon-profile-lineage-offspring a')[0],
    hasSilhouette: !!$('[data-tooltip-source="#dragon-profile-icon-silhouette-tooltip"]')[0],
    isPermababy: !!$('[data-tooltip-source="#dragon-profile-icon-eternal-youth-tooltip"]')[0],
    isBaby: (stat(4, true) != 'Adult'),
    primaryColor: stat(0, true),
    primaryGene: removeAncientBreedDescriptor(stat(0, false)),
    secondaryColor: stat(1, true),
    secondaryGene: removeAncientBreedDescriptor(stat(1, false)),
    tertiaryColor: stat(2, true),
    tertiaryGene: removeAncientBreedDescriptor(stat(2, false)),
    breed: stat(4, false),
    flight: stat(5, true),
    eyes: stat(5, false),
    dateOfBirth: moment(stat(3, false), 'MMM DD, YYYY').format('YYYY/MM/DD'),
    tags: [],
  });

  return dragon;
}

function dragonLookup(payload) {
    try {
      const $ = cheerio.load(payload);
      let dragons = [];

      if ($('#error-404')[0]) {
        return null;
      } else if ($('meta[property="og:url"]')[0] && $('meta[property="og:url"]').attr('content').substr(0, 37) === 'https://www1.flightrising.com/dragon/') {
        dragons.push(importDragonFromDragonBlob($));
      } else if ($('#lair-view-page')[0]) {
        dragons = dragons.concat(importDragonsFromLairBlob($));
      } else if ($('.dragon-profile-header-title')[0] && $('.dragon-profile-lineage-offspring')[0]) {
        dragons.push(importDragonFromDragonBlob($));
      }  else {
        return null;
      }

      return dragons;
    } catch (e) {}

    return null;
}

function buildString(dragon) {
	var str = '';
	str += dragon.name();
	str += '\t' + dragon.gender();
	str += '\t' + dragon.breed();
	str += '\t' + dragon.primaryColor();
	str += '\t' + dragon.primaryGene();
	str += '\t' + dragon.secondaryColor();
	str += '\t' + dragon.secondaryGene();
	str += '\t' + dragon.tertiaryColor();
	str += '\t' + dragon.tertiaryGene();
	str += '\t' + dragon.flight();
	str += '\t' + dragon.eyes();
	str += '\t' + (dragon.isFirstGen() ? '1' : '2+');
	str += '\t' + (dragon.isPermababy() ? 'Yes' : 'No');
	str += '\t' + (dragon.hasSilhouette() ? 'Yes' : 'No');
	str += '\t' + dragon.id();
	str += '\t' + dragon.dateOfBirth();
	str += '\t' + (dragon.isBred() ? 'Yes' : 'No');
	return str;
}

export default {
	data() {
		return {
			results: '',
			textStuff: '',
		};
	},
	head() {
		return {
			title: "Dragon to Sheets",
		};
	},
	methods: {
		loadDragon(e) {
			this.error = '';
			let pastedText = '';
			try {
			if (window.clipboardData && window.clipboardData.getData) { // IE
				pastedText = window.clipboardData.getData('Text');
			} else if (e.clipboardData && e.clipboardData.getData) {
				pastedText = e.clipboardData.getData('text/html');
			}
			
			this.processInput(pastedText);
			} catch(e) {
				alert('Error!1');
			}
		},
		processInput(t) {
			this.error = '';
			try {
				const [dragon] = dragonLookup(t);
				if (!dragon) {
					alert('Error!2');
				} else {
					//console.log(dragon.id(), t);
					this.results = buildString(dragon);
					//console.log('Okay');
				}
			} catch(e) {
				alert('Error!3');
			}
		}
	}
}
</script>
