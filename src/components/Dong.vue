<template>
  <header class="w-full rounded-lg bg-neutral-200 px-6 py-3 dark:bg-neutral-900">
    <h2
      class="flex items-center justify-center gap-4 align-baseline font-mono text-2xl font-bold leading-9"
    >
      <img src="/beer.svg" alt="" class="h-12 w-12 drop-shadow-title xs:h-16 xs:w-16" />
      <span class="text-4xl xs:text-6xl xl:text-7xl">{{ local.currentBeer }}/{{ dong.beers }}</span>
    </h2>
  </header>
  <Timer :end="local.endTime" @end="dongAlert"></Timer>
  <footer class="flex items-center gap-8">
    <button
      type="button"
      class="btn bg-red-700 hover:bg-red-800 focus:ring-red-300"
      @click="cancel"
    >
      <i class="ico text-4xl leading-none xs:text-5xl">cancel</i
      ><span class="hidden">{{ $t('dong.cancel') }}</span>
    </button>
  </footer>
</template>

<script setup lang="ts">
import { watch, reactive, ref, type Ref } from 'vue'
import type { IDong } from '@/models/models'
import Timer from './Timer.vue'

const emit = defineEmits(['end'])
const props = defineProps<{
  dong: IDong
}>()

const local = reactive({
  active: false,
  currentBeer: 0,
  endTime: 0
})

const timeout: Ref<ReturnType<typeof setTimeout>> | Ref<undefined> = ref(undefined)

// Watchers
watch(
  props.dong,
  (newVal) => {
    if (!newVal.active) return
    const timeDiff = getTimeDiff(newVal.time)
    const timeBetweenBeer = Math.floor((timeDiff / newVal.beers) * newVal.sipSize)

    local.active = true
    local.endTime = timeBetweenBeer

    initDong()
  },
  { immediate: true }
)

// Dong logic
function initDong() {
  if (timeout.value) {
    clearTimeout(timeout.value)
  }

  timeout.value = setTimeout(dongAlert, local.endTime)
}

function dongAlert() {
  local.currentBeer += props.dong.sipSize
  console.log('Dong!')

  if (local.currentBeer >= props.dong.beers) {
    cancel()
  } else {
    initDong()
  }
}

function cancel() {
  local.active = false
  clearTimeout(timeout.value)
  emit('end')
}

// Helpers
function getTimeDiff(end: string) {
  const now = new Date()
  const nowH = now.getHours()
  const nowM = now.getMinutes()
  const nowS = now.getSeconds()

  const endH = parseInt(end.split(':')[0])
  const endM = parseInt(end.split(':')[1])

  let hoursDiff = endH - nowH
  let minutesDiff = endM - nowM

  // Adjust for negative minutes
  if (minutesDiff < 0) {
    hoursDiff -= 1
    minutesDiff += 60
  }

  // If the target time is in the past, adjust the date to tomorrow
  if (hoursDiff < 0 || (hoursDiff === 0 && minutesDiff < 0)) {
    hoursDiff += 24
  }

  // Return time diff in milliseconds
  return ((hoursDiff * 60 + minutesDiff) * 60 + (60 - nowS)) * 1000
}
</script>
