import Vue from 'vue'
import App from './App.vue'
import {mount} from './mount'
Vue.config.productionTip = false

mount(new Vue({
  render: h => h(App),
}))
