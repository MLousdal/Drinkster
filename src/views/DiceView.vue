<template>
  <section
    class="container flex h-[calc(100vh-52px)] flex-col items-center justify-between py-2 md:h-[calc(100vh-72px)]"
  >
    <header></header>
    <div class="grid place-items-center">
      <main
        class="flex h-fit cursor-pointer flex-wrap items-center justify-center gap-12"
        @click="rollAllDice"
      >
        <Dice v-for="die in dice" :key="die" />
      </main>
    </div>
    <footer class="flex items-center gap-8">
      <button class="btn bg-green-700 hover:bg-green-800 focus:ring-green-300" @click="dice++">
        <i class="ico text-4xl leading-none xs:text-5xl">add</i
        ><span class="hidden">{{ $t('dice.addDice') }}</span>
      </button>
      <button class="btn bg-red-700 hover:bg-red-800 focus:ring-red-300" @click="dice--">
        <i class="ico text-4xl leading-none xs:text-5xl">remove</i
        ><span class="hidden">{{ $t('dice.addDice') }}</span>
      </button>
    </footer>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Dice from '@/components/Dice.vue'

const min = -6
const max = 6

const dice = ref(1)

function rollAllDice() {
  const dice = document.querySelectorAll('.dice') as NodeListOf<HTMLElement>
  if (!dice) return

  Array.from(dice).forEach((die) => {
    rollDice(die)
  })
}

function rollDice(dice: HTMLElement) {

  var xRand = getRandom(max, min)
  var yRand = getRandom(max, min)

  dice.style.transform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)'
}

function getRandom(max: number, min: number) {
  return (Math.floor(Math.random() * (max - min)) + min) * 90
}
</script>
