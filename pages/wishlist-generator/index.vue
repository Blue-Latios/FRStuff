<template>
<div class="container">
  <div class="text-bold">Text format:<br>
  </div>
  
  Use <u>CATEGORY:</u> followed by name to make a category.<br>
  <br>
  Example wishlist:<br>
  CATEGORY: Genes<br>
  Primary Gene: Jaguar<br>
  Secondary Gene: Blend<br>
  Tertiary Gene: Capsule<br>
  CATEGORY: Misc.<br>
  Greattusk<br>
  Rotala<br><br>
  
  <div class="text-bold">Enter your items text here.<br><br>
  </div>
  <textarea v-model="textStuff" placeholder="Write your items in Notepad where you can save and edit for later, and copy paste it here." style="width:90%;"></textarea><br>
  Column number: <select v-model="columnNo">
  <option>3</option>
  <option>4</option>
  <option>5</option>
  <option>6</option>
  <option>7</option>
  </select>
  <button @click="generate">Generate BBCode</button><br><br>
  Copy everything from here:<br>
  <p class="preformat">{{ result }}</p>
  <hr>
  <div class="footnote" style="font-size: 10px;"><a target="_blank" rel="noopener noreferrer" href="https://www1.flightrising.com/forums/gde/3269795">Tool thread</a><br>
  Tool by BlueLatios.</div>
</div></template>

<script>
export default {
	data() {
		return {
			result: '',
			textStuff: '',
			columnNo: 4,
		};
	},
	head() {
		return {
			title: "Wishlist Generator",
		};
	},
	methods: {
		generate() {
			var s = '[center]';
			var sArray = this.textStuff.split('\n');
			var col = 0;
			sArray.forEach(x => {
				if (x.substring(0,9) === "CATEGORY:") {
					s = s.concat("\n\n[size=5][b]", x.substring(10,x.length), "[/b][/size]\n-----\n");
					col = 0;
				}
				else {
					s = s.concat("[item=", x, "]");
					col++;
					if (col == this.columnNo) {
						col = 0;
						s = s.concat("\n");
					}
				}
			});
			this.result=s.concat("[/center]");
		},
	}
}
</script>

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
