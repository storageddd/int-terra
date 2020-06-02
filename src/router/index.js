import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/Index.vue';

import { FileOperationsBeforeEnter } from './hooks';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/field-operations/:id',
    name: 'FieldOperations',
    beforeEnter: FileOperationsBeforeEnter,
    component: () => import(/* webpackChunkName: "pages/field-operations" */ '../views/FieldOperations/Index.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
