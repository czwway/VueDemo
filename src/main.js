// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import echarts from 'echarts'

import store from './vuex.js'


Vue.prototype.$echarts = echarts 
Vue.use(ElementUI)


Vue.config.productionTip = false

// const store = new Vuex.Store({
// 	  state: {
// 	    count: 0
// 	  },
// 	  mutations: {
// 	    increment (state) {
// 	      state.count++
// 	      console.log(store.state.count)
// 	    }
// 	  }
// 	})


//实例化vue对象
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  template: '<App/>',
  components: { App },
})
