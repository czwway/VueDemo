import Vue from 'vue'
import Router from 'vue-router'
import Input3D from './components/input3D.vue'
import Me from './components/me.vue'
import Todo from './components/todo.vue'
import DataMatrix from './components/datamatrix.vue'
import Tally from './components/tally.vue'
import VuexDome from './components/vuex-demo.vue'
Vue.use(Router)
 
export default new Router({
    linkActiveClass: 'active',
    // 路由配置
    routes: [
    {
        path: '/Input3D',
        component: Input3D
    }, {
        path: '/Me',
        component: Me
    }, {
        path: '/Todo',
        component: Todo
    },{
        path: '/DataMatrix',
        component: DataMatrix
    }, {
        path: '/Tally',
        component: Tally
    }, {
        path: '/VuexDome',
        component: VuexDome
    }, {
        path: '/*',
        component: Me
    }
    ]
})