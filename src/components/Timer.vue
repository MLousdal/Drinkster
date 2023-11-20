<template>
  <time class="font-mono text-6xl md:text-8xl">{{ formattedTime }}</time>
</template>
<script setup lang="ts">
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
const props = defineProps<{
  end: number // in ms
}>()

const emit = defineEmits(['end'])

const elapsedTime = ref(0)
const time = reactive({
  hours: 0,
  minutes: 0,
  seconds: 0
})

let x = setInterval(() => {
  const distance = Math.floor(props.end - elapsedTime.value)

  // Time calculations for days, hours, minutes and seconds
  time.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  time.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  time.seconds = Math.floor((distance % (1000 * 60)) / 1000)

  if (distance <= 999) {
    emit('end', distance)
    elapsedTime.value = 0
    time.hours = 0
    time.minutes = 0
    time.seconds = 0
  }
  elapsedTime.value += 1000
}, 1000)

const formattedTime = computed(() => {
  return `${time.hours ? time.hours.toString().padStart(2, '0') + ':' : ''}${
    time.minutes ? time.minutes.toString().padStart(2, '0') + ':' : ''
  }${time.seconds.toString().padStart(2, '0')}`
})

onBeforeUnmount(() => {
  clearInterval(x)
})
</script>
