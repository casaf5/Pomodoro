<template>
	<div class="pomodoro-wrapper flex-center col" :style="{ fontFamily: userPrefs.font }">
		<h1 class="title">pomodoro</h1>
		<TimerMode @onSetMode="setMode" :prefs="userPrefs" />
		<Timer :modeMinutes="currMode.minutes" :ringColor="userPrefs.color" :key="currMode.modeName" />
		<img
			class="icon"
			src="@/assets/images/icon-settings.svg"
			alt="settings-icon"
			@click="toggleSettings"
		/>
		<PomodoroSettings
			v-if="isSettingsOpen"
			:settings="userPrefs"
			@close="isSettingsOpen = false"
			@saveSettings="saveSettings"
		/>
	</div>
</template>

<script>
import TimerMode from '@/components/TimerMode.vue'
import Timer from '@/components/Timer.vue'
import PomodoroSettings from '@/components/PomodoroSettings.vue'

export default {
	name: 'Pomodoro',
	components: {
		TimerMode,
		Timer,
		PomodoroSettings,
	},
	data() {
		return {
			userPrefs: {
				time: { pomodoro: 25, short: 5, long: 15 },
				font: 'Kumbh Sans',
				color: '#f87070',
			},
			currMode: { modeName: 'pomodoro', minutes: 25 },
			isSettingsOpen: false,
		}
	},
	methods: {
		setMode(modeName) {
			this.currMode = { modeName, minutes: +this.userPrefs.time[modeName] }
		},
		toggleSettings() {
			this.isSettingsOpen = !this.isSettingsOpen
		},
		saveSettings(prefs) {
			this.userPrefs = { ...prefs }
		},
	},
}
</script>
