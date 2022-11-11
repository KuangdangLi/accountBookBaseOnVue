import Vue, {CreateElement} from 'vue';
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false

Vue.component('Layout',layout)
Vue.component('Icon',Icon)

new Vue({
  router,
  store,
  render: (h:CreateElement) => h(App)
}).$mount('#app')

window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 200);
  }, 0);
};