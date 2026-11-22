<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { useDetailsStore } from '@/stores/details'

  const location = ref("")
  const weather = ref("")
  const showWeather = ref(false)
  const OPENWEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY

  function getLocation(){
    if(!navigator.geolocation){
      location.value = "Location not supported in this browser"
      return
    }

    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition( (geolocation) => {
        location.value = {
          lat : geolocation.coords.latitude,
          lon : geolocation.coords.longitude}
        resolve()
        },
        (error) => {
          location.value = "Encountered an error, try again later : " + error
          reject()
        },
        { timeout: 10000, maximumAge: 60000 }
      )
    })
  }
  const detailsStore = useDetailsStore()

  async function getCurrentWeather(){
    await getLocation()
    await getWeather()

    showWeather.value = true
  }

  async function getWeather(){
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params : {
        lat: location.value.lat,
        lon: location.value.lon,
        appid: OPENWEATHER_KEY
      }
    })

    weather.value = response.data
  }

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
    <hr>

    <button @click="getCurrentWeather">Get Weather With OpenWeather</button>
    <div v-if="showWeather">
      Longitude : {{ location.lon }} <br>
      Latitude : {{ location.lat }} <br>
      Weather : {{ weather.weather[0].main }} <br>
    </div>
  </div>
</template>

<style scoped>
.col {
  padding: 10px;
}
</style>
