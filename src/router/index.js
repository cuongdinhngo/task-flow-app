import {createRouter, createWebHistory} from 'vue-router';
import TaskList from '@/components/Task/TaskList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/task',
      component: TaskList
    }
  ]
});

export default router;