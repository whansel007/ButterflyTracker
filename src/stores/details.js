import { onMounted, ref } from "vue";
import { defineStore } from "pinia";

export const useDetailsStore = defineStore('details', () => {
  // States
  const date = ref("2026-11-22")
  const time = ref("09:00")
  const weather = ref("Sunny")
  const transect = ref("1 (Fort Canning Park)")
  const confidence = ref("1")
  const notes = ref("")

  function saveDetails(){
    localStorage.setItem('details', JSON.stringify({
      date : date.value,
      time : time.value,
      weather : weather.value,
      transect : transect.value,
      confidence: confidence.value,
      notes : notes.value,
    }))
  }

  function loadDetails(){
    const detailsRaw = localStorage.getItem('details')

    if(!detailsRaw){
      return
    }

    const details = JSON.parse(detailsRaw)
    date.value = details.date
    time.value = details.time
    weather.value = details.weather
    transect.value = details.transect
    confidence.value = details.confidence
    notes.value = details.notes
  }

  function resetDetails(){
    date.value = "2026-11-22"
    time.value = "09:00"
    weather.value = "Sunny"
    transect.value = "1 (Fort Canning Park)"
    confidence.value = "1"
    notes.value = ""

    saveDetails()
  }

  onMounted( ()=> {
    loadDetails()
  })

  return {date, time, weather, transect, confidence, notes, saveDetails, loadDetails, resetDetails}
})
