<script setup>
import { useDetailsStore } from '@/stores/details'

const detailsStore = useDetailsStore()
</script>

<template>
  <div class="container-fluid">
    <h1 class="text-center">Survey Details</h1>

    <div>
      <div class="row row-cols-2">
        <div class="col">
          Date : <br />
          <input
            type="date"
            placeholder="2026-11-22"
            @change="detailsStore.saveDetails"
            v-model="detailsStore.date"
          />
        </div>

        <div class="col">
          Time : <br />
          <input
            type="time"
            placeholder="09:00"
            @change="detailsStore.saveDetails"
            v-model="detailsStore.time"
          />
        </div>

        <div class="col">
          Weather : <br />
          <select @change="detailsStore.saveDetails" v-model="detailsStore.weather">
            <option value="Sunny" selected>Sunny</option>
            <option value="Clear">Clear</option>
            <option value="Cloudy">Cloudy</option>
          </select>
        </div>

        <div class="col">
          Transect : <br />
          <select @change="detailsStore.saveDetails" v-model="detailsStore.transect">
            <option value="1 (Fort Canning Park)" selected>1 (Fort Canning Park)</option>
            <option value="2 (LKS Library)">2 (LKS Library)</option>
            <option value="3 (Dhoby Ghaut)">3 (Dhoby Ghaut)</option>
            <option value="4 (Istana Park)">4 (Istana Park)</option>
          </select>
        </div>

        <div class="col">
          Notes : <br />
          <textarea @change="detailsStore.saveDetails" v-model="detailsStore.notes"></textarea>
        </div>

        <div class="col">
          Confidence : <br />
          <select @change="detailsStore.saveDetails" v-model="detailsStore.confidence">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.col {
  padding: 10px;
}
</style>
