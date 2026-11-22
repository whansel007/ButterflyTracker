import { createRouter, createWebHistory } from 'vue-router'
import { useButterfliesStore } from '@/stores/butterflies'

import TrackerView from '@/views/TrackerView.vue'
import ResultsView from '@/views/ResultsView.vue'
import DetailsView from '@/views/DetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path : "/", component : TrackerView},
    {path : "/details", component : DetailsView},
    {path : "/result", component : ResultsView, meta: { needNonZeroCount : true}}
  ],
})

router.beforeEach( (to, from) => {
  if(!to.meta.needNonZeroCount){
    return
  }

  const butterfliesStore = useButterfliesStore()
  if(butterfliesStore.getTotalButterflyCount() <= 0){
    alert("There is no butterflies tracked yet!" + from.path)
    router.push(from.path)
  }
})

export default router
