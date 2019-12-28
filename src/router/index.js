import Vue from 'vue';
import VueRouter from 'vue-router';

// import Home from '../views/Home.vue';
// import Mv from '../views/Mv.vue';
// import Radio from '../views/Radio.vue';
// import Profile from '../views/Profile.vue';
// import Play from '../views/Play.vue';
// import Search from '../views/Search.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    // component: Home
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/mv',
    name: 'mv',
    component: () => import(/* webpackChunkName: "mv" */ '../views/Mv.vue')
  },
  {
    path: '/radio',
    name: 'radio',
    component: () => import(/* webpackChunkName: "radio" */ '../views/Radio.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  },
  {
    path: '/play',
    name: 'play',
    component: () => import(/* webpackChunkName: "play" */ '../views/Play.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
