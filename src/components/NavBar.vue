<script setup>
import { useButterfliesStore } from '@/stores/butterflies';


const butterfliesStore = useButterfliesStore()

</script>

<template>

<nav class="navbar navbar-expand bg-success">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">Butterfly Tracker</a>

    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="/details">Details</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/result">Result ({{ butterfliesStore.getTotalButterflyCount() }})</a>
      </li>
    </ul>
  </div>
</nav>

</template>

<style scoped>

</style>
