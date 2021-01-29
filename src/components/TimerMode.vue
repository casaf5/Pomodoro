<template>
	<div class="timer-mode-wrapper flex-center">
		<button v-for="mode in modes" :ref="mode" @click="setMode(mode)" :style="getStyle(mode)">
			{{ mode !== 'pomodoro' ? `${mode} break` : 'pomodoro' }}
		</button>
	</div>
</template>

<!-- :style="{ backgroundColor: bgColor }" -->
<script>
export default {
	name: 'TimerMode',
	props: {
		prefs: {
			type: Object,
		},
	},
	data() {
		return {
			modes: ['pomodoro', 'short', 'long'],
			selectedMode: 'pomodoro',
		}
	},

	methods: {
		setMode(mode) {
			this.selectedMode = mode
			this.$emit('onSetMode', mode)
		},
		getStyle(mode) {
			return mode === this.selectedMode
				? { backgroundColor: this.prefs.color, color: '#1E213F' }
				: ''
		},
	},
}
</script>
