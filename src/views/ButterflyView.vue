<script setup>
import ButterflyImage from '@/components/ButterflyImage.vue';
import router from '@/router';

import { useButterfliesStore } from '@/stores/butterflies';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const butterfliesStore = useButterfliesStore()
const route = useRoute()

const butterfly = computed( () => {
  return butterfliesStore.getButterfly(route.params.id)
})
</script>

<template>
  <div class="container-fluid d-flex flex-column align-items-center">
    <h1 class="text-center">{{ butterfly.name }}</h1>


    <ButterflyImage :img="butterfly.img"></ButterflyImage>

    <p class="text-center">
      Latin name : {{ butterfly.latinName }}
    </p>
    <button class="btn btn-success" type="button" @click="router.back()">Back</button>
  </div>

</template>

<style scoped>

</style>
