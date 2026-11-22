<script setup>

import { useDetailsStore } from '@/stores/details';

const detailsStore = useDetailsStore()

</script>

<template>
  <div class="container-fluid">
    <h1>Edit Survey Details</h1>

    <label for="">
      Date :
      <input type="date" name="" id="">
    </label>
    <br>
    <label for="">
      Time :
      <input type="time" name="" id="">
    </label>
    <br>
    <label for="">
      Weather : 
    </label>
    <br>
    <label for="">
      Notes : <br>
      <textarea @change="detailsStore.saveDetails" v-model="detailsStore.notes"></textarea>
    </label>
  </div>

</template>

<style scoped>

</style>
