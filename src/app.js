import Vue from 'vue';
import fastclick from 'fastclick';
import router from './router';
import store from './store';
import './app.scss';

fastclick.attach(document.body);

const app = new Vue({
  el: '#_j_app',
  template: '<router-view></router-view>',
  store,
  router,
});
