<template><div>
<span @click="() => hidden = !hidden"><b>{{ icon }}</b> <span v-html="name" /></span>
<span v-if="!hidden" v-html="result" />
</span>
</div></template>

<script>

export default {
	props: {
		line: {
			required: true,
		}
	},
	data() {
		return {
			hidden: false,
		}
	},
	computed: {
		icon() {
			if (this.hidden) return 'V';
			else return '^';
		},
		result() {
			var processed = this.line.split("<br>");
			return this.line.substring(processed[0].length + 4);
		},
		name() {
			var processed = this.line.split("<br>");
			return processed[0] + (processed[1] ? "<br>" : '');
		},
	}
}
</script>
