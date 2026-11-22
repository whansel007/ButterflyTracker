<script setup>
import { useButterfliesStore } from '@/stores/butterflies';

const butterfliesStore = useButterfliesStore()

</script>

<template>
  <div class="container-fluid">
    {{ $route.params.id }}
    <button type="button">Back</button>
  </div>

</template>

<style scoped>

</style>
