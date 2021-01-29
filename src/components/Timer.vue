<template>
	<div class="timer-wrapper flex-center">
		<div class="inner-circle flex-center" @click="toggleTimerState">
			<svg class="progress-ring" width="300" height="300" ref="progressRing">
				<circle
					class="progress-ring"
					:stroke="ringColor"
					stroke-width="6"
					fill="transparent"
					r="138"
					cx="150"
					cy="150"
				/>
			</svg>
			<div class="time flex-center col">
				<h1>
					<span>{{ minutes | padNum }}</span
					>:<span>{{ seconds | padNum }}</span>
				</h1>
				<h3>{{ getTimerState }}</h3>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Timer',
	props: {
		modeMinutes: {
			type: Number,
			required: true,
		},
		ringColor: {
			type: String,
		},
	},
	data() {
		return {
			isPaused: false,
			isStarted: false,
			isDone: false,
			seconds: 0,
			minutes: this.modeMinutes,
			timeInterval: null,
		}
	},
	computed: {
		getTimerState() {
			if (!this.isStarted) return 'START'
			if (this.isDone) return 'RESTART'
			return this.isPaused ? 'RESUME' : 'PAUSE'
		},
	},
	methods: {
		moveTimer() {
			if (this.seconds <= 0) {
				this.minutes--
				this.seconds = 59
			} else {
				this.seconds--
			}
			if (this.minutes <= 0 && this.seconds <= 0) {
				clearInterval(this.timeInterval)
				this.isDone = true
			}
			this.$refs.progressRing.style.strokeDashoffset = this.calcOffset()
		},
		startTimer() {
			this.$refs.progressRing.style.strokeDashoffset = 0
			this.timeInterval = setInterval(this.moveTimer, 1000)
			this.seconds = 0
			this.minutes = this.modeMinutes
			this.isStarted = true
		},
		calcOffset() {
			let totalSeconds = this.modeMinutes * 60
			let passedSeconds = this.modeMinutes * 60 - (this.minutes * 60 + this.seconds)
			return (passedSeconds / totalSeconds) * 867
		},
		toggleTimerState() {
			if (this.isDone) {
				this.isDone = false
				this.isStarted = false
				this.isPaused = false
			}
			if (!this.isStarted) {
				this.startTimer()
				return
			}
			if (!this.isPaused) clearInterval(this.timeInterval)
			else this.timeInterval = setInterval(this.moveTimer, 1000)
			this.isPaused = !this.isPaused
		},
	},
	destroyed() {
		if (this.timeInterval) clearInterval(this.timeInterval)
	},
	filters: {
		padNum: function(num) {
			return num.toString().padStart(2, '0')
		},
	},
}
</script>
