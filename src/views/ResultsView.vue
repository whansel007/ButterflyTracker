<script setup>

import { useButterfliesStore } from '@/stores/butterflies';
import { useDetailsStore } from '@/stores/details';
import { onMounted, ref } from 'vue';

const butterfliesStore = useButterfliesStore()
const detailsStore = useDetailsStore()

const report = ref("")
const resetReady = ref(false)

function toMinutes(time){
  const timeList = time.split(":")

  const hours = parseInt(timeList[0])
  const minutes = parseInt(timeList[1])

  return hours * 60 + minutes
}

function to12Clock(totalMinutes){
  let hour = Math.floor(totalMinutes / 60)
  let minutes = totalMinutes % 60

  let ext

  if(totalMinutes > toMinutes("12:00")){
    if(hour > 12) {
      hour -= 12
    }
    ext = "PM"
  } else {
    ext = "AM"
  }

  return (hour < 10? "0" + hour : hour) + ":" + (minutes < 10? "0" + minutes : minutes) + " " + ext
}

// Report building
function buildReport(){
  report.value = ""
  report.value += "Transect " + detailsStore.transect + "\n"
  report.value += detailsStore.date.split("-").reverse().join("-") + " | "
  report.value += to12Clock(toMinutes(detailsStore.time)) + " - "
  report.value += to12Clock(toMinutes(detailsStore.time) + 20) + "\n\n"

  for(const b of butterfliesStore.butterflies){
    if(b.count <= 0){
      continue
    }

    report.value += b.name + ", " + b.count + "\n"
  }

  if(detailsStore.notes){
    report.value += "\nNotes:\n" + detailsStore.notes
  }
}

onMounted( buildReport )

function copyReport(){
  navigator.clipboard.writeText(report.value)
  alert("Report Copied!")
}

function showReset(){
  resetReady.value = !resetReady.value
}

function resetAll(){
  resetReady.value = false

  detailsStore.resetDetails()
  butterfliesStore.resetAllCount()
  buildReport()
}

</script>

<template>
  <div class="container-fluid">
    <h1 class="text-center">Survey Results</h1>

    <div class="border border-1 rounded-1">
      <pre>{{ report }}</pre>
    </div>

    <br>

    <ul>
      <li>
        <input @click="copyReport" class="btn bg-success text-light" type="button" value="Copy">
      </li>
      <li>
        <input @click="showReset"
          :class="['btn', 'text-light', resetReady? 'bg-warning' : 'bg-danger']" type="button"
          :value="resetReady? 'Cancel' : 'Reset'">
      </li>
    </ul>

    <br>
    <div v-if="resetReady" class="container">
      Are you sure you want to reset? <br>
      <input @click="resetAll" class="btn bg-danger text-light" type="button" value="Confirm">
    </div>

  </div>


</template>

<style scoped>

ul{
  list-style: none;

  padding: 0;
  margin: 0;

  display: flex;

  justify-content: space-around;
  align-items: center;
}

</style>
