<script setup>
import { ref } from 'vue';
import CounterWidget from '@/components/CounterWidget.vue';
import DeleteButton from '@/components/DeleteButton.vue';
import { useButterfliesStore } from '@/stores/butterflies';

const butterfliesStore = useButterfliesStore()

const newButterflyName = ref("")

</script>

<template>
  <div class="container">
    <h1 class="text-center">Butterflies List</h1>
    <p class="text-center">Delete or add butterflies to the options database</p>
    <div class="container-fluid gap-2 d-flex justify-content-center">
      <input type="text" v-model="newButterflyName" placeholder="Butterfly name">
      <button @click="butterfliesStore.addButterfly(newButterflyName)" class="btn btn-success text-light"> + </button>
    </div>
    <br>
    <table class="table table-secondary table-striped">
      <thead>
        <tr>
          <th>
            Name
          </th>
          <th>
            Counter
          </th>
          <th>
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in butterfliesStore.butterflies" :key="b.id">
          <td>
            <RouterLink class="text-black" :to="'/butterfly/' + b.id">
              {{ b.name }}
            </RouterLink>
          </td>
          <td>
            <CounterWidget :id="b.id"></CounterWidget>
          </td>
          <td>
            <DeleteButton @delete="butterfliesStore.deleteButterfly(b.id)"></DeleteButton>
          </td>
        </tr>
      </tbody>
    </table>

    <button @click="butterfliesStore.resetDatabase" class="btn bg-danger text-light">Reset Dataset</button>
  </div>
</template>

<style scoped>
</style>
