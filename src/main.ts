import Vue, {CreateElement} from 'vue';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import layout from '@/components/Layout.vue';

Vue.config.productionTip = false

Vue.component('Layout',layout)

new Vue({
  router,
  store,
  render: (h:CreateElement) => h(App)
}).$mount('#app')
