<script setup>

import NavBar from './components/NavBar.vue';

</script>

<template>
  <div class="stickynav w-100">
    <NavBar/>
  </div>
  <RouterView/>
</template>

<style scoped>
.stickynav{
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>
