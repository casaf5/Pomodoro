import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import './styles/styles.scss'
import { upperFirst, camelCase } from 'loadsh'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
