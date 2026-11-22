<script setup>

import { useButterfliesStore } from '@/stores/butterflies';
import { useDetailsStore } from '@/stores/details';

const butterfliesStore = useButterfliesStore()
const detailsStore = useDetailsStore()

</script>

<template>
  <div class="container-fluid">
    <h1 class="text-center">Survey Results</h1>

    <div class="border border-1 rounded-1">
      <span v-for="b in butterfliesStore.butterflies" :key="b.id">
        <span v-if="b.count != 0">
          {{ b.name }}, {{ b.count }}
          <br>
        </span>
      </span>
    </div>
    Notes: <br>
    {{ detailsStore.notes }}
  </div>

</template>

<style scoped>

</style>
