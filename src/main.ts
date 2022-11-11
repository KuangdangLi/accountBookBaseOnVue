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

if(document.documentElement.clientWidth >500 ){
  window.alert('为了您得到满意的浏览效果，请用手机扫描二维码打开本页面')
  const img = document.createElement('img')
  img.src = '/qrCode.png'
  img.style.position = 'fixed'
  img.style.left = '50%'
  img.style.top = '50%'
  img.style.transform = 'translate(-50%,-50%)'
  img.style.boxShadow = '0 0 10px rgba(0,0,0,0.25)'
  document.body.appendChild(img)
}