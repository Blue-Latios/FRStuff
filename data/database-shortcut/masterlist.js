module.exports = {
	//Baldwin mats here
	//Goo
	"Green Goo": {id:1886,},
	"Yellow Goo": {id:1887,},
	"Orange Goo": {id:1888,},
	"Red Goo": {id:1889,},
	"Purple Goo": {id:1890,},
	"Blue Goo": {id:1891,},
	//Ooze
	"Green Ooze": {id:1892,},
	"Yellow Ooze": {id:1893,},
	"Orange Ooze": {id:1894,},
	"Red Ooze": {id:1895,},
	"Purple Ooze": {id:1896,},
	"Blue Ooze": {id:1897,},
	//Sludge
	"Green Sludge": {id:1898,},
	"Yellow Sludge": {id:1899,},
	"Orange Sludge": {id:1900,},
	"Red Sludge": {id:1901,},
	"Purple Sludge": {id:1902,},
	"Blue Sludge": {id:1903,},
	//Transmustuff
	"Glass Beaker": {id:10868,
		baldwin: {
			yield: 2,
			cost: 50,
			time: 30,
			exp: 35,
			items: [
				["Green Ooze", 1],
				["Green Sludge", 1],
				["Broken Bottle", 3],
			],
		},},
	"Sizzling Phosphorus": {id:10883,
		baldwin: {
			yield: 1,
			cost: 150,
			time: 40,
			exp: 65,
			items: [
				["Yellow Sludge", 1],
				["Red Sludge", 1],
				["Glass Beaker", 1],
			],
		},},
	//Other Important IDs
	"Rusted Treasure Chest": {id:574,
		gathering: {
			method: "Digging",
			level: 1,
			locations: ["All"],
		},
		monsters: [
			["Black Iron Creeper", "Very Rarely"],
			["Blooming Strangler", "Very Rarely"],
			["Blue Tang Hippogriff", "Very Rarely"],
			["Construction Mith", "Very Rarely"],
			["Dodo", "Very Rarely"],
			["Dream Eater", "Very Rarely"],
			["Longneck Magi", "Very Rarely"],
			["Red-Winged Owlcat", "Very Rarely"],
			["Scrapmetal Tracker", "Very Rarely"],
			["Tengu", "Very Rarely"],
			["Wildwood Owl", "Very Rarely"],
		],},
	"Iron Treasure Chest": {id:575,
		gathering: {
			method: "Digging",
			level: 1,
			locations: ["All"],
		},},
	"Gilded Treasure Chest": {id:576,
		gathering: {
			method: "Digging",
			level: 1,
			locations: ["All"],
		},},
	//Everything else down below
	"Sweetheart Swan": {id:21525,
		swap: [
			["Sparrow Skull", 25],
			["Carpenter Wax", 20],
		]
	},
	"Sparrow Skull": {id:192,
		containers: ["Broken Bone Bottle"],
		gathering: {
			method: "Scavenging",
			level: 1,
			locations: ["Plague", "Wind", "Light"],
		},
		monsters: [
			["Death Seeker", "Scarce"],
			["Emerald Webwing", "Scarce"],
			["Steam Gyre", "Scarce"],
		],},
	"Carpenter Wax": {id:5707,
		monsters: [
			["Coral Carpenter", "Common"],
		]
	},
	"Clay": {id:177,
		gathering: {
			method: "Digging",
			level: 1,
			locations: ["Lightning", "Light", "Nature"],
		},
		monsters: [
			["Venerable Shalebuck ", "Scarce"],
		]
	},
	//Full info purposefully ommitted items
	"Broken Bottle": {id:788},
	"Broken Penny Jar": {id:787},
	"Broken Bone Bottle": {id:793},
}
