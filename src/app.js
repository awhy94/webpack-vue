import Vue from 'vue';
import router from './router';
import store from './store';

const app = new Vue({
  el: '#_j_app',
  template: '<router-view></router-view>',
  store,
  router,
});