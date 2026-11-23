<script setup>

import { ref } from 'vue';

const counter = ref(0)

const arr = ["a" , "c", "b"]

arr.sort( (a , b) => {
  if(a > b){
    return 1
  } else if (a < b){
    return -1
  }
  return 0
})

</script>

<template>

  <table>
    <tr>
      <th>Hello</th>
      <th>There</th>
    </tr>
    <tr>
      <td>How</td>
      <td>Are</td>
    </tr>
  </table>
  {{ arr }}
  <button @click="counter++"> {{ counter }}</button>
</template>

<style scoped>

</style>
