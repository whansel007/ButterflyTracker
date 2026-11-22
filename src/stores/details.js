import { onMounted, ref } from "vue";
import { defineStore } from "pinia";

export const useDetailsStore = defineStore('details', () => {
  // States
  const notes = ref("")

  function saveDetails(){
    localStorage.setItem('details', JSON.stringify({
      notes : notes.value
    }))
  }

  function loadDetails(){
    const detailsRaw = localStorage.getItem('details')

    if(!detailsRaw){
      return
    }

    const details = JSON.parse(detailsRaw)
    notes.value = details.notes
  }

  onMounted( ()=> {
    loadDetails()
  })

  return {notes, saveDetails, loadDetails}
})
