<script setup>

  import { defineProps } from 'vue';
  import { computed } from 'vue';

  import { useButterfliesStore } from '@/stores/butterflies';

  const butterfliesStore = useButterfliesStore()

  const props = defineProps({
    id : Number
  })

  const count = computed(() => {
    return butterfliesStore.butterflies[props.id].count
  })

</script>

<template>
  <div>
    <ul>
      <li>
        <button
        @click="butterfliesStore.increaseCount(id)"
        class="btn btn-success"> + </button>
      </li>
      <li>
        {{ count }}
      </li>
      <li>
        <button
        @click="butterfliesStore.decreaseCount(id)"
        :class="['btn',
        count > 0? 'btn-danger' : 'disabled']">-</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
div{
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
}

ul{
  list-style: none;

  padding: 0;
  margin: 0;

  display: flex;

  justify-content: space-around;
  align-items: center;
}
</style>
