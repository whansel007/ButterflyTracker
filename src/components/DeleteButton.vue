<script setup>

import { ref, defineEmits } from 'vue';

const emit = defineEmits(['delete'])

const readyDelete = ref(false)

function confirmDelete(){
  if(readyDelete.value){
    emit('delete')
  }

  readyDelete.value = !readyDelete.value
}

</script>

<template>
<button class="btn" @click="confirmDelete"> {{ readyDelete? '🗑️' : '❌' }}  </button>
</template>

<style scoped>

</style>
