import Vue from 'vue';
import VueRouter from 'vue-router';
// import Demo01 from '@/app/demo01/components/Demo01App.vue';

Vue.use(VueRouter);

const Demo01 = () => import(/* webpackChunkName: 'Demo01' */'@/app/demo01/components/Demo01App.vue');
const Demo02 = () => import(/* webpackChunkName: 'Demo02' */'@/app/demo02/components/Demo02App.vue');

const router = new VueRouter({
  mode: 'history',
  routes: [{
    name: 'demo01',
    path: '/demo01',
    component: Demo01,
  }, {
    name: 'demo02',
    path: '/demo02',
    component: Demo02,
  }, {
    name: 'default',
    path: '*',
    redirect: () => ({
      name: 'demo01',
    }),
  }],
});

export default router;
