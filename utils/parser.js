export default {
  parseLairPage,
  parseDragonPage
}

function parseLairPage(s) {
  try {
    return buildStrings(s);
  } catch(e) {
    return null;
	}
}

function parseDragonPage(s) {
  try {
    return buildDragonData(s);
  } catch(e) {
    return null;
	}
}

function parseIcons(page) {
  let a = (page.includes("icon-eternal-youth-tooltip") ? "Yes" : "No");
	let b = (page.includes("icon-silhouette-tooltip") ? "Yes" : "No");
	let c = (page.includes("icon-reflect-tooltip") ? "Yes" : "No");
	return [a, b, c];
}

function getBetween(s, start, end) {
  let re = new RegExp(start + "([^]*?)" + end);
  return s.match(re)[1];
}

//----------------------

function buildLairString(t, i, cTime) {
	
	//tooltip data extraction
	const pattern = />([^<>]*)<\//g;
	let data = [];
	const matches = t.matchAll(pattern);
	for (let match of matches) {
		data.push(match[1].trim());
	}
	
	//console.log(data);
	
	let name = data[0]
	
	let desc = data[1].split(" ");
	let breed = desc[0];
	let gender = desc[1];
	
	let level = data[3].split(" ")[1];
	
	let id = data[6];
	//let age = data[9];
	let gen = (data[12] == "First Generation" ? "1" : "2+");
	
	let prim = data[15].split(" ");
	let primaryColor = prim[0];
	let primaryGene = prim[1];
	let sec = data[18].split(" ");
	let secondaryColor = sec[0];
	let secondaryGene = sec[1];
	let tert = data[21].split(" ");
	let tertiaryColor = tert[0];
	let tertiaryGene = tert[1];
	
	let eye_type = data[24].split(" ");
	let element = eye_type[0];
	let eyes = eye_type[1];
	
	//icons data extraction
	let [isPermabab, isSilhouette, isFlip] = parseIcons(i);
	
	//string building
	let str = '';
	str += name;
	str += '\t' + gender;
	str += '\t' + breed;
	str += '\t' + primaryColor;
	str += '\t' + primaryGene;
	str += '\t' + secondaryColor;
	str += '\t' + secondaryGene;
	str += '\t' + tertiaryColor;
	str += '\t' + tertiaryGene;
	str += '\t' + element;
	str += '\t' + eyes;
	str += '\t' + gen;
	str += '\t' + isPermabab;
	str += '\t' + isSilhouette;
	str += '\t' + id;
	str += '\t' + level;
	str += '\t' + isFlip;
	str += '\t' + cTime;
	//console.log("passed");
	return str;
}

function buildStrings(page) {
	
	//get time taken
	
	let cTime = page.match(/<time datetime="([^"]+)"/)[1];
	let matches;
	
	//get dragontip data
	const dragontip_pattern = /class="dragontip"([^]*?)property">\s+Diet/g;
	let data = [];
	matches = page.matchAll(dragontip_pattern);
	for (let match of matches) {
		data.push(match[1].trim());
	}
	
	//console.log(data);
	
	//get icons data
	const icons_pattern = /class="lair-page-dragon-thumbnail lair-dragon-tooltip" rel="#dragontip-([^]*?)(class="lair-page-dragon"|class="lair-footer")/g;
	//start string regex is so to get the first part of string is the ID
	let icons = [];
	matches = page.matchAll(icons_pattern);
	for (let match of matches) {
		icons.push(match[1].trim());
	}
	
	//console.log(data.length);
	//console.log(icons.length);
	
	//sort the icons data
	function compareStringsByNumber(a, b) {
		const numA = a.substring(0, a.indexOf(`">`));
		const numB = b.substring(0, b.indexOf(`">`));
		return numA - numB;
	}
	
	icons.sort(compareStringsByNumber);
	
	//string building
	let strAll = '';
	for (let i = 0; i < data.length; i++) {
		strAll += buildLairString(data[i], icons[i], cTime) + '\n';
	}
	
	return strAll;
}

//----------------------

function buildDragonData(page) {
  let matches;
  
  //we ignore whatever's on bio
  let t = page.split("dragon-profile-bio-header")[0];
	//header
	let name = t.match(/width="350" height="350" alt="([^" ]+)/)[1];
	let id = t.match(/\(#(\d+)/)[1];
	
	//gender and breed based on icon tooltip
	let desc = t.match(/icon-sex-tooltip([^]*?)<\/span>/)[1];
	desc = getBetween(desc, "alt=\"", "\"").trim().split(" ");
	let gender = desc[0];
	let breed = desc[1];
	
	//icons
	let [isPermabab, isSilhouette, isFlip] = parseIcons(t);
	
	//physical attributes part trimming
	let phys = t.match(/dragon-profile-physical([^]*?<\/div>)\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/)[1];
	
	//measurements
  const statPattern = /dragon-profile-stat-value">([^]*?)<\/div>/g;
	matches = [...phys.matchAll(statPattern)];
	let length = matches[0][1].slice(0,-2);
	let wingspan = matches[1][1].slice(0,-2);
	let weight = matches[2][1].slice(0,-3);
	
	//genes and others
	const genePattern = /dragon-profile-stat-icon-value[^]*?>([^]*?)<\/div>/g;
	matches = [...phys.matchAll(genePattern)];
	function processMatches(a) {
	  let x = a.split("<br>");
	  let y = getBetween(x[1], "<strong>", "</strong>").split(" ")[0];
	  return [x[0].trim(), y.trim()];
	}
	let [primaryColor, primaryGene] = processMatches(matches[0][1]);
	let [secondaryColor, secondaryGene] = processMatches(matches[1][1]);
	let [tertiaryColor, tertiaryGene] = processMatches(matches[2][1]);
	let birthdate = getBetween(matches[3][1], "<strong>", "</strong>");
	let [element, eyes] = processMatches(matches[5][1]);
	
	//lineage
	let gen = t.match(/dragon-profile-lineage-parents([^]*?)<\/ul>/)[1];
	gen = (gen.includes("href") ? "2+" : "1");
	
	let isBred = t.match(/dragon-profile-lineage-offspring([^]*?)<\/ul>/)[1];
	isBred = (isBred.includes("href") ? "Yes" : "No");
	
	
	//time
	let cTime = t.match(/<time datetime="([^"]+)"/)[1];
	
	//data building (not joined to strings)
	let arr = [];
	arr.push(name); //0
	arr.push(gender); //1
	arr.push(breed); //2
	arr.push(primaryColor); //3
	arr.push(primaryGene); //4
	arr.push(secondaryColor); //5
	arr.push(secondaryGene); //6
	arr.push(tertiaryColor); //7
	arr.push(tertiaryGene); //8
	arr.push(element); //9
	arr.push(eyes); //10
	arr.push(gen); //11 1 or 2+
	arr.push(isPermabab); //12 Yes/No
	arr.push(isSilhouette); //13 Yes/No
	arr.push(id); //14
	arr.push(birthdate); //15 MM DD, YYYY
	arr.push(isBred); //16 Yes/No
	arr.push(length); //17
	arr.push(wingspan); //18
	arr.push(weight); //19
	arr.push(isFlip); //20 Yes/No
	arr.push(cTime); //21
	return arr;
}
