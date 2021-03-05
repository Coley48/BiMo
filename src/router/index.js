import Vue from 'vue'
import VueRouter from 'vue-router'
import guidance from '../view/guidance/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Guidance',
    component: guidance,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../view/login/index.vue')
  },
  {
    path: '/introduce',
    name: 'Introduce',
    component: () => import('../view/introduce/index.vue')
  }, {
    path: '/journey',
    name: 'Journey',
    component: () => import('../view/journey/index.vue')
  }, {
    path: '/ceremony',
    name: 'Ceremony',
    component: () => import('../view/ceremony/index.vue')
  }, {
    path: '/dictation',
    name: 'Dictation',
    component: () => import('../view/dictation/index.vue')
  }, {
    path: '/sakumap',
    name: 'Sakumap',
    component: () => import('../view/sakumap/index.vue')
  }, {
    path: '/ending',
    name: 'Ending',
    component: () => import('../view/ending/index.vue')
  },
  {
    path: '*',
    redirect: { name: "Guidance" }
  }
]


// const routes = [
//   {
//     path: '/bimo.html',
//     name: 'Guidance',
//     component: guidance,
//   },
// {
//     path: '/bimo.html#login',
//     name: 'Login',
//     component: () => import('../view/login/index.vue')
// },
//   {
//     path: '/bimo.html#introduce',
//     name: 'Introduce',
//     component: () => import('../view/introduce/index.vue')
//   }, {
//     path: '/bimo.html#journey',
//     name: 'Journey',
//     component: () => import('../view/journey/index.vue')
//   }, {
//     path: '/bimo.html#ceremony',
//     name: 'Ceremony',
//     component: () => import('../view/ceremony/index.vue')
//   }, {
//     path: '/bimo.html#dictation',
//     name: 'Dictation',
//     component: () => import('../view/dictation/index.vue')
//   }, {
//     path: '/bimo.html#sakumap',
//     name: 'Sakumap',
//     component: () => import('../view/sakumap/index.vue')
//   }, {
//     path: '/bimo.html#ending',
//     name: 'Ending',
//     component: () => import('../view/ending/index.vue')
//   },
//   {
//     path: '*',
//     redirect: { name: "Guidance" }
//   }
// ]

const router = new VueRouter({
  // mode: 'hash',
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
