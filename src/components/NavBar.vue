<script setup>
import { useButterfliesStore } from '@/stores/butterflies';


const butterfliesStore = useButterfliesStore()

</script>

<template>

<nav class="navbar navbar-expand bg-success">
  <div class="container-fluid">
    <RouterLink class="navbar-brand" to="/">🦋 Tracker</RouterLink>

    <ul class="navbar-nav">
      <li class="nav-item">
        <RouterLink class="nav-link" to="/List">List</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/details">Details</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/result">Result ({{ butterfliesStore.getTotalButterflyCount() }})</RouterLink>
      </li>
    </ul>
  </div>
</nav>

</template>

<style scoped>

</style>
