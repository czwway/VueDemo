/*
* vuex管理测试 文件
* vuex.js
*/
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
	//状态 state
	state: {
	    count: 0
	},
	//store 的计算属性 getters
	getters: {
		doneTodos: state => {
	    	return state.count * 2
	    }
	},
	//actions提交mutations
	actions: {
	    increment ({ commit }) {
		    setTimeout(() => {
		    	commit('increment')
		    }, 1000)
		}
	},
	//改变状态
	mutations: {
	    increment (state) {
	    	state.count++
	    	console.log("测试："+state.count)
	    }
	},
});