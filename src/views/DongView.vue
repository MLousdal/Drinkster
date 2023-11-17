<template>
  <section class="view">
    <Dong v-if="dong.active" :dong="dong" @end="dong.active = false"></Dong>
    <form
      @submit.prevent="generateDong"
      class="flex w-full max-w-lg flex-col items-center justify-center gap-6"
      v-else
    >
      <div class="w-full" v-for="item in data" :key="item.name">
        <label :for="item.name" class="mb-2 block text-lg font-medium">{{
          $t(`dong.${item.name}.label`)
        }}</label>
        <div class="flex">
          <span
            class="inline-flex items-center rounded-s-md border border-e-0 border-neutral-300 bg-neutral-200 px-3 text-lg text-neutral-900 dark:border-neutral-600 dark:bg-neutral-600 dark:text-neutral-400"
            >{{ item.icon }}
          </span>
          <input
            :type="item.type"
            :id="item.name"
            v-model="item.value"
            class="block w-full rounded-e-lg border border-neutral-300 bg-neutral-50 p-4 text-sm text-neutral-900 outline-none focus:border-amber-500 focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
            required
          />
        </div>
      </div>
      <div class="w-full">
        <label for="sips" class="mb-2 block text-lg font-medium">{{ $t('dong.sip.label') }}</label>
        <div class="flex">
          <span
            class="inline-flex items-center rounded-s-md border border-e-0 border-neutral-300 bg-neutral-200 px-3 text-lg text-neutral-900 dark:border-neutral-600 dark:bg-neutral-600 dark:text-neutral-400"
            >{{ sipSize.icon }}
          </span>
          <select
            id="sips"
            v-model="sipSize.value"
            class="block w-full rounded-lg border border-neutral-300 bg-neutral-50 p-4 pe-6 text-sm focus:border-amber-500 focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700 dark:placeholder-neutral-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
          >
            <option v-for="size in sipSizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>
        </div>
      </div>
      <button type="submit" class="btn w-fit bg-green-700 hover:bg-green-800 focus:ring-green-300">
        <i class="ico text-4xl leading-none xs:text-5xl">play_circle</i
        ><span class="hidden">
          {{ $t('dong.start') }}
        </span>
      </button>
    </form>
  </section>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import type { IDong } from '@/models/models'
import Dong from '@/components/Dong.vue'

const data = reactive({
  time: { value: '14:30', name: 'time', type: 'time', icon: '⏰' },
  players: { value: 3, name: 'players', type: 'number', icon: '👯' },
  beer: { value: 24, name: 'beer', type: 'number', icon: '🍺' }
})

const sipSizes = [0.25, 0.5, 0.75, 1]
const sipSize = reactive({ value: sipSizes[1], name: 'sipSize', type: 'text', icon: '🤏' })

const dong: IDong = reactive({
  active: false,
  beers: 0,
  players: 1,
  time: '12:00',
  sipSize: 0.5
})

function generateDong() {
  const beerPerPlayer = Math.floor(data.beer.value / data.players.value)

  dong.active = true
  dong.beers = beerPerPlayer
  dong.players = data.players.value
  dong.time = data.time.value
  dong.sipSize = sipSize.value
}
</script>
