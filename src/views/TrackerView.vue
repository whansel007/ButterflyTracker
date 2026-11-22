<script setup>

import ButterflyCard from '@/components/ButterflyCard.vue';

import { useButterfliesStore } from '@/stores/butterflies';
import { ref, computed } from 'vue';

const butterfliesStore = useButterfliesStore()

const filter = ref("")

const filteredButterflies = computed( () => {
  return butterfliesStore.butterflies.filter( (b) => b.name.toLowerCase().includes(filter.value.toLowerCase()))
})

</script>

<template>
  <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4">
    <div class="col" v-for="b in filteredButterflies" :key="b.id">
        <ButterflyCard :id="b.id"></ButterflyCard>
    </div>
  </div>

  <div class="bg-success fixed-bottom text-light btm">
    <div class="filtergrid">
      <div class="p-1">
        Filter :
      </div>
      <input v-model="filter" type="text">
    </div>
  </div>



</template>

<style scoped>

.bheader{
  display: flex;
  flex-direction: column;

  align-items: center;
}

.filtergrid{
  display: grid;

  width: 80%;

  grid-template-columns: auto 1fr;

}

.btm{
  display: flex;
  justify-content: center;
  padding: 10px;
}

</style>
