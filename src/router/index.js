import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Mv from '../views/Mv.vue';
import Radio from '../views/Radio.vue';
import Profile from '../views/Profile.vue';
import Play from '../views/Play.vue';
import Search from '../views/Search.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/mv',
    name: 'mv',
    component: Mv
  },
  {
    path: '/radio',
    name: 'radio',
    component: Radio
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/play',
    name: 'play',
    component: Play
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
