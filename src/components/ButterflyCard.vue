<script setup>
import { defineProps, ref } from 'vue'
import { useButterfliesStore } from '@/stores/butterflies.js'
import CounterWidget from './CounterWidget.vue'

const props = defineProps({
  id: Number,
})

const butterfliesStore = useButterfliesStore()
const butterfly = ref(butterfliesStore.butterflies[props.id])
</script>

<template>
  <div class="bcard border border-black border-1 rounded-3">

    <div class="bcard-body">
      {{ butterfly.name }}
      <img class="bimg" :src="butterfly.img" :alt="butterfly.name" />
    </div>

    <CounterWidget :id="id"></CounterWidget>
  </div>
</template>

<style scoped>
.bimg {
  width: 200px;
  height: 200px;
}

.bcard {
  display: inline-block;
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
