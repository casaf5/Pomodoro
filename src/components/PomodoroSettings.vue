<template>
	<transition name="fade">
		<div class="settings-wrapper flex-center " @click.self="close">
			<div class="settings-container flex col">
				<div class="title flex space-between align-center">
					<h2>Settings</h2>
					<img src="@/assets/images/icon-close.svg" alt="close" @click="close" />
				</div>
				<div class="mode-minutes flex col justify-center">
					<h3>time (minutes)</h3>
					<div class="minutes-selector flex space-between">
						<div class="time-option flex col" v-for="mode in modes">
							<span class="mode-name">{{ mode }}</span>
							<div class="amount flex space-between align-center">
								<span>{{ selectedSettings.time[mode] }}</span>
								<section class="adjust-time flex col">
									<img
										src="@/assets/images/icon-arrow-up.svg"
										alt="arrow-up"
										@click="setTime(mode, 1)"
									/>
									<img
										src="@/assets/images/icon-arrow-down.svg"
										alt="arrow-down"
										@click="setTime(mode, -1)"
									/>
								</section>
							</div>
						</div>
					</div>
				</div>
				<div class="selection flex">
					<h3>FONT</h3>
					<div class="options-container flex">
						<div
							v-for="font in fonts"
							:key="font"
							class="option font"
							:class="{ selected: selectedSettings.font === font }"
							:style="{ fontFamily: font }"
							@click="setStyle('font', font)"
						>
							Aa
						</div>
					</div>
				</div>
				<div class="selection flex">
					<h3>color</h3>
					<div class="options-container flex">
						<div
							v-for="color in colors"
							:key="color"
							class="option color"
							:class="{ selected: selectedSettings.color === color }"
							:style="{ backgroundColor: color }"
							@click="setStyle('color', color)"
						></div>
					</div>
				</div>
				<button class="btn-apply" @click="saveChanges">Apply</button>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'Settings',
	props: {
		settings: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			selectedSettings: { ...this.settings },
			fonts: ['Kumbh Sans', 'Roboto Slab', 'Space Mono'],
			colors: ['#f87070', '#70f3f8', '#d881f8'],
			modes: ['pomodoro', 'short', 'long'],
		}
	},
	methods: {
		close() {
			this.$emit('close')
		},
		saveChanges() {
			this.$emit('saveSettings', this.selectedSettings)
			this.$emit('close')
		},
		setStyle(key, value) {
			this.selectedSettings[key] = value
		},
		setTime(mode, diff) {
			let updatedTime = this.selectedSettings.time[mode] + diff
			if (updatedTime >= 1 && updatedTime <= 99) this.selectedSettings.time[mode] = updatedTime
		},
	},
}
</script>

<style lang="scss" scoped></style>
