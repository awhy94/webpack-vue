import Vue from 'vue';
import fastclick from 'fastclick';
import _ from 'lodash';
import { Button } from 'vue-kit-test';
import router from './router';
import store from './store';

import allsettledTest from './test/allsettledTest';

allsettledTest();


// const app = new Vue({
//   el: '#_j_app',
//   template: '<router-view></router-view>',
//   store,
//   router,
// });

// console.log(234)

// const testCommon = require('./test/testCommon')
// const testAmd = require('./test/testAmd')
// const testImport = require('./test/testImport')
// import testImport1 from  './test/testImport'

// import './app.scss';
// import * as uitls from 'wa-utils-test';
// import {env, common, IoWatcher} from 'wa-utils-test';

// console.log(env)
// console.log(IoWatcher)
// console.log('哈哈哈哈哈哈哈阿数据库和会计师')

// console.log(uitls.Foo)
// const test = new uitls.Foo()
// console.log(test.say)
// console.log(test.say(132))


fastclick.attach(document.body);

console.log(Button);
console.log(_);

Vue.use(Button);
// console.log(Button)

const app = new Vue({
  el: '#_j_app',
  template: '<router-view></router-view>',
  store,
  router,
});
