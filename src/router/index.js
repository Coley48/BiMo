import Vue from 'vue'
import VueRouter from 'vue-router'
import guidance from '../view/guidance/index.vue'


// 解决vue-router报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter)

const routes = [
  {
    path: './index.html',
    name: 'Guidance',
    component: guidance,
  },
  {
    path: './index.html#introduce',
    name: 'Introduce',
    component: () => import('../view/introduce/index.vue')
  }, {
    path: './index.html#journey',
    name: 'Journey',
    component: () => import('../view/journey/index.vue')
  }, {
    path: './index.html#ceremony',
    name: 'Ceremony',
    component: () => import('../view/ceremony/index.vue')
  }, {
    path: './index.html#dictation',
    name: 'Dictation',
    component: () => import('../view/dictation/index.vue')
  }, {
    path: './index.html#sakumap',
    name: 'Sakumap',
    component: () => import('../view/sakumap/index.vue')
  }, {
    path: './index.html#ending',
    name: 'Ending',
    component: () => import('../view/ending/index.vue')
  },
  {
    path: '*',
    redirect: { name: "Guidance" }
  }
]

const router = new VueRouter({
  // mode: 'hash',
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
