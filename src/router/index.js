import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '../views/GoodsList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    /* {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, */
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    }
  ]
})
