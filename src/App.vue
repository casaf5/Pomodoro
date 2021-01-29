<template>
	<div id="app" class="site-main-layout">
		<Pomodoro />
		<AppFooter />
	</div>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'
import Pomodoro from './views/Pomodoro.vue'
export default {
	components: {
		AppFooter,
		Pomodoro,
	},
}
</script>
