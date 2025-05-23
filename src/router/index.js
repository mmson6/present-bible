import Vue from 'vue'
import VueRouter from 'vue-router'
import Show from '../views/Show.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Show',
    component: Show
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
