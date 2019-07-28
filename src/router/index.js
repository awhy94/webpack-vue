import Vue from 'vue';
import VueRouter from 'vue-router';
import Demo01 from '@/app/demo01/components/Demo01App.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [{
    name: 'demo01',
    path: '/demo01',
    component: Demo01,
  }, {
    name: 'default',
    path: '*',
    redirect: () => {
      return {
        name: 'demo01',
      }
    },
  }]
});

export default router;