import { createRouter, createWebHistory } from 'vue-router'

import TrackerView from '@/views/TrackerView.vue'
import ResultView from '@/views/ResultView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path : "/", component : TrackerView},
    {path : "/result", component : ResultView}
  ],
})

export default router
