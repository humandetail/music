import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import 'js/common.js';
import 'js/iconfont.js';

import 'styles/reset.css';
import 'styles/border.css';
import 'styles/common.scss';
import 'animate.css';

import Toast from './plugins/toast/index.js';

import Player from 'utils/Player';
Vue.prototype.audioPlayer = new Player(); // 实例化播放器并挂载到Vue的原型上

Vue.use(Toast);

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'img/error.png',
  loading: 'img/loading.gif',
  attempt: 1
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
