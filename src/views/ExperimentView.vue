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

const reveal = ref(false)

</script>

<template>

  <table>
    <thead>
      <tr>
        <th>Hello</th>
        <th>There</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>How</td>
        <td>Are</td>
      </tr>
    </tbody>
  </table>
  {{ arr }}
  <button @click="counter++; reveal = !reveal"> {{ counter }}</button>
  <br>

  <img v-if="reveal" src="https://c.tenor.com/QNPLViwKh-IAAAAC/rick-astley-never-gonna-give-you-up.gif" alt="">
</template>

<style scoped>

</style>
