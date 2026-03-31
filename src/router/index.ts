import { createRouter, createWebHistory } from 'vue-router';
import CreateProject from '@/views/CreateProject.vue';
import DesignProcess from '@/views/DesignProcess.vue';
import ResultSummary from '@/views/ResultSummary.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/create'
    },
    {
      path: '/create',
      name: 'CreateProject',
      component: CreateProject
    },
    {
      path: '/design',
      name: 'DesignProcess',
      component: DesignProcess
    },
    {
      path: '/result',
      name: 'ResultSummary',
      component: ResultSummary
    }
  ]
});

export default router;
