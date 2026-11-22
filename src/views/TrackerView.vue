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
  <div class="container-fluid">
    <div class="row row-cols-2 row-cols-md-4 cards-grid">
      <div class="col" v-for="b in filteredButterflies" :key="b.id">
        <ButterflyCard :id="b.id"></ButterflyCard>
      </div>
    </div>
  </div>

  <div class="bg-success text-light btm">
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

.cards-grid {
  padding-bottom: calc(70px + env(safe-area-inset-bottom));
}

.btm {
  padding: 10px 10px calc(10px + env(safe-area-inset-bottom));
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>
