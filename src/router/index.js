import Vue from 'vue';
import VueRouter from 'vue-router';
// import Demo01 from '@/app/demo01/components/Demo01App.vue';

Vue.use(VueRouter);

const Demo01 = () => import(/* webpackChunkName: 'Demo01' */'@/app/demo01/components/Demo01App.vue');

const router = new VueRouter({
  mode: 'history',
  routes: [{
    name: 'demo01',
    path: '/demo01',
    component: Demo01,
  }, {
    name: 'default',
    path: '*',
    redirect: () => ({
      name: 'demo01',
    }),
  }],
});

export default router;
