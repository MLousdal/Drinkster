<template>
  <section class="view">
    <Gong v-if="gong.active" :gong="gong" @end="gong.active = false"></Gong>
    <form
      @submit.prevent="generateGong"
      class="flex h-full w-full max-w-lg flex-col items-center justify-center gap-6"
      v-else
    >
      <template v-for="item in data" :key="item.name">
        <div class="w-full" v-if="!item.hidden">
          <label :for="item.name" class="mb-2 block text-lg font-medium">{{
            $t(`gong.${item.name}.label`)
          }}</label>
          <div class="flex">
            <template v-if="item.name == 'booze'">
              <div
                class="mx-2 flex grow items-center rounded border border-neutral-200 ps-4 first:ms-0 last:me-0 dark:border-neutral-700"
                v-for="type in boozeTypes"
                :key="type"
              >
                <input
                  :id="`bordered-radio-${type}`"
                  type="radio"
                  v-model="item.value"
                  :value="type"
                  name="bordered-radio"
                  class="h-4 w-4 border-neutral-300 bg-neutral-100 text-amber-600 focus:ring-2 focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700 dark:ring-offset-neutral-800 dark:focus:ring-amber-600"
                />
                <label
                  :for="`bordered-radio-${type}`"
                  class="ms-2 w-full py-4 text-sm font-medium text-neutral-900 dark:text-neutral-300"
                  >{{ $t(`gong.booze.${type}`) }}</label
                >
              </div>
            </template>
            <template v-else>
              <span
                class="inline-flex items-center rounded-s-md border border-e-0 border-neutral-300 bg-neutral-200 px-3 text-lg text-neutral-900 dark:border-neutral-600 dark:bg-neutral-600 dark:text-neutral-400"
                >{{ item.icon }}
              </span>
              <select
                v-if="item.name === 'sip'"
                :id="item.name"
                v-model="item.value"
                class="block w-full rounded-e-lg border border-neutral-300 bg-neutral-50 p-4 pe-6 text-sm focus:border-amber-500 focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700 dark:placeholder-neutral-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
              >
                <option v-for="size in sipSizes" :key="size" :value="size">
                  {{ size }}
                </option>
              </select>
              <input
                v-else
                :type="item.type"
                :id="item.name"
                v-model="item.value"
                class="block w-full rounded-e-lg border border-neutral-300 bg-neutral-50 p-4 text-sm text-neutral-900 outline-none focus:border-amber-500 focus:ring-amber-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-neutral-400 dark:focus:border-amber-500 dark:focus:ring-amber-500"
                required
              />
            </template>
          </div>
        </div>
      </template>
      <button
        type="submit"
        class="btn mt-auto w-fit bg-green-700 hover:bg-green-800 focus:ring-green-300"
      >
        <i class="ico text-4xl leading-none xs:text-5xl">play_circle</i
        ><span class="hidden">
          {{ $t('gong.start') }}
        </span>
      </button>
    </form>
  </section>
</template>
<script setup lang="ts">
import { reactive, watch } from 'vue'
import { BoozeType } from '@/models/models'
import type { IGong } from '@/models/models'
import Gong from '@/components/Gong.vue'

const sipSizes = [0.25, 0.5, 0.75, 1]
const boozeTypes = [BoozeType.Beer, BoozeType.Shots]

const data = reactive({
  time: { value: '14:30', name: 'time', type: 'time', icon: '⏰', hidden: false },
  players: { value: 4, name: 'players', type: 'number', icon: '👯', hidden: false },
  booze: { value: BoozeType.Beer, name: 'booze', type: 'radio', icon: '🧃', hidden: false },
  bottles: { value: 1, name: 'bottles', type: 'number', icon: '🥃', hidden: true },
  beer: { value: 24, name: 'beer', type: 'number', icon: '🍺', hidden: false },
  sip: { value: sipSizes[1], name: 'sip', type: 'select', icon: '🤏', hidden: false }
})

const gong: IGong = reactive({
  active: false,
  beers: 0,
  booze: BoozeType.Beer,
  players: 1,
  time: '12:00',
  sipSize: 0.5
})

function generateGong() {
  let boozePerPlayer = 0

  if (data.booze.value == BoozeType.Beer) {
    boozePerPlayer = Math.floor(data.beer.value / data.players.value)
  } else if (data.booze.value == BoozeType.Shots) {
    boozePerPlayer = Math.floor(Math.floor((data.bottles.value * 75) / 2) / data.players.value)
  }

  gong.active = true
  gong.beers = boozePerPlayer
  gong.booze = data.booze.value
  gong.players = data.players.value
  gong.sipSize = data.sip.value
  gong.time = data.time.value
}

watch(data, (newVal) => {
  if (newVal.booze.value == BoozeType.Beer) {
    data.bottles.hidden = true
    data.beer.hidden = false
    data.sip.hidden = false
  } else if (newVal.booze.value == BoozeType.Shots) {
    data.bottles.hidden = false
    data.beer.hidden = true
    data.sip.hidden = true
    data.sip.value = 1
  }
})
</script>
