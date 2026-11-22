import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";

export const useButterfliesStore = defineStore ('butterfliesStore' , () => {
  // States
  const butterflies = ref([])

  function saveButterflies(){
    localStorage.setItem('butterflies', JSON.stringify(butterflies.value))
  }

  function loadButterflies(){
    const loadedRaw = localStorage.getItem('butterflies')

    if(loadedRaw){
      butterflies.value = JSON.parse(loadedRaw)
    }
    else{
      resetDatabase()
    }
  }

  function addButterfly(name, latinName = "not spesified"){
    const id = getDatabaseButterflyCount()

    butterflies.value.push({
      id : id,
      name : name,
      latinName : latinName,
      img : "/butterfly/" + name.split(" ").join("") +  ".png",
      count : 0
    })

    saveButterflies()
  }

  onMounted( () => {
    loadButterflies()
  })

  function resetDatabase(){
    butterflies.value = []
    addButterfly("Unidentified")
    addButterfly("Common Mime", "Chilasa clytia clytia")
    addButterfly("Lime Butterfly", "Papilio demoleus malayanus")
    addButterfly("Common Mormon", "Papilio polytes romulus")
    addButterfly("Common Birdwing ", "Troides helena cerberus")
    addButterfly("Common Rose", "Pachliopta aristolochiae asteris")
    addButterfly("Emigrants", "Catopsilia spp.")
    addButterfly("Grass Yellows", "Eurema spp.")
    addButterfly("Striped Albatross", "Appias libythea olferna")
    addButterfly("Painted Jezebel ", "(Delias hyparete metarete")
    addButterfly("Psyche", "Leptosia nina malayana")
    addButterfly("Plain Tiger", "Danaus chrysippus chrysippus")
    addButterfly("Common Tiger", "Danaus genutia genutia")
    addButterfly("Black Veined Tiger", "Danaus melanippus hegesippus")
    addButterfly("Blue Glassy Tiger", "Ideopsis vulgaris macrina")
    addButterfly("Dark Glassy Tiger", "Parantica agleoides agleoides")
    addButterfly("Common Palmfly", "Elymnias hypermnestra agina")
    addButterfly("Bush Browns", "Mycalesis spp.")
    addButterfly("Peacock Pansy", "Junonia almana javana")
    addButterfly("Chocolate Pansy", "Junonia hedonia ida")
    addButterfly("Blue Pansy ", "Junonia orithya wallacei")
    addButterfly("Tawny Coster", "Acraea violae")
    addButterfly("Leopard", "Phalanta phalantha phalantha")
    addButterfly("Grass Blues", "Lycaeninae spp.")
  }


  // Getters
  function getTotalButterflyCount() {
    return butterflies.value.reduce( (acc, b) => acc + b.count, 0)
  }

  function getButterfly(id){
    return butterflies.value.find( (b) => b.id == id)
  }

  function getDatabaseButterflyCount(){
    return Object.keys(butterflies.value).length
  }

  // Action
  function increaseCount(id){
    butterflies.value.find( (b) => b.id == id).count += 1
    saveButterflies()
  }

  function decreaseCount(id){
    butterflies.value.find( (b) => b.id == id).count -= 1
    saveButterflies()
  }

  function clearCount(id){
    butterflies.value.find( (b) => b.id == id).count = 0
    saveButterflies()
  }

  function resetAllCount(){
    butterflies.value.map( (b) => b.count = 0)
    saveButterflies()
  }

  function deleteButterfly(id){
    butterflies.value = butterflies.value.filter( (b) => b.id != id)
    saveButterflies()
  }

  return {butterflies, addButterfly, getButterfly, getTotalButterflyCount, increaseCount, decreaseCount, clearCount, resetAllCount, resetDatabase, deleteButterfly}
})
