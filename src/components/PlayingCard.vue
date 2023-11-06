<template>
  <img :src="`/playing_cards/fronts/${card}.svg`" :alt="card" ref="cardElm" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import VanillaTilt from 'vanilla-tilt'

defineProps<{
  card: string
}>()

const cardElm = ref(null)

onMounted(() => {
  if (!cardElm.value) return
  VanillaTilt.init(cardElm.value, {
    max: 15,
    perspective: 2000,
    speed: 300,
    gyroscope: true,
    gyroscopeMinAngleX: -15,
    gyroscopeMaxAngleX: 15,
    gyroscopeMinAngleY: -15,
    gyroscopeMaxAngleY: 15
  })
})
</script>
