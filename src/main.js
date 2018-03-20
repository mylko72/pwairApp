import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'chart.js'
import 'hchs-vue-charts'
import App from './App.vue'
//import VueResource from 'vue-resource';
import { routes } from './routes.js'

export const eventBus = new Vue();

//Vue.use(VueResource);
Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(VueCharts)

const router = new VueRouter({
  routes,
  mode: 'history'
});

const vm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

//vm.$http.get();
