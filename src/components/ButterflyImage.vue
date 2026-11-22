<script setup>

import { ref, defineProps} from 'vue';

const props = defineProps({
  img : String,
  alt : Number
})

const useDefault = ref()


</script>

<template>
  <img @error="useDefault = true"
    class="bimg" :src="useDefault? '/butterfly/Unidentified.png' : props.img" :alt="props.name" />
</template>

<style scoped>
.bimg {
  display: block;
  width: 100%;
  max-width: 200px;
  height: 200px;
}
</style>
