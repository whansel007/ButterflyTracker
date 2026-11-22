<script setup>
import { defineProps, ref } from 'vue'
import { useButterfliesStore } from '@/stores/butterflies.js'
import CounterWidget from './CounterWidget.vue'
import ButterflyImage from './ButterflyImage.vue'

const props = defineProps({
  id: Number,
})

const butterfliesStore = useButterfliesStore()
const butterfly = ref(butterfliesStore.getButterfly(props.id))
</script>

<template>
  <div class="bcard border border-black border-1 rounded-3">

    <div class="bcard-body">

      <RouterLink :to="'/butterfly/' + butterfly.id">
        {{ butterfly.name }}
      </RouterLink>

      <ButterflyImage @click="butterfliesStore.increaseCount(butterfly.id)"
        :id="butterfly.id"
        :img="butterfly.img"
        :alt="butterfly.name"></ButterflyImage>
    </div>

    <CounterWidget :id="id"></CounterWidget>
  </div>
</template>

<style scoped>

.bcard {
  display: block;
  width: 100%;

  margin-top: 10px;
}

.bcard-body {
  display: flex;
  flex-direction: column;

  align-items: center;
}

.barea{
  display: flex;
  justify-content: space-around;
  padding: 0;
}

</style>
