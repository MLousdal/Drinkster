<template>
  <section
    class="container flex h-[calc(100vh-53px)] flex-col items-center justify-around gap-4 py-2 md:h-[calc(100vh-73px)]"
  >
    <header class="rounded-lg bg-neutral-200 px-6 py-3 dark:bg-neutral-900">
      <h2 class="flex items-center gap-4 align-baseline font-mono text-2xl font-bold leading-9">
        <img src="/beer.svg" alt="" class="xs:h-16 xs:w-16 h-12 w-12 drop-shadow-title" />
        <i class="ico">close</i><span class="xs:text-6xl text-4xl xl:text-7xl">{{ tally }}</span>
      </h2>
    </header>
    <div
      class="xs:w-3/4 relative grid aspect-card w-3/4 min-w-[156px] max-w-[468px] place-items-center"
    >
      <img
        v-for="card in currentCard"
        :key="card"
        :src="`/playing_cards/fronts/${deck[card - 1]}.svg`"
        alt=""
        class="relative col-start-1 row-start-1 aspect-card scale-90"
        :style="offsets[card]"
      />
      <transition name="spin">
        <PlayingCard
          :card="deck[currentCard]"
          :key="currentCard"
          class="relative inset-0 z-20 col-start-1 row-start-1 max-h-full shadow-xl"
        ></PlayingCard>
      </transition>
    </div>
    <footer class="flex items-center gap-8">
      <button
        type="button"
        class="xs:p-4 aspect-square rounded-lg bg-green-700 p-2 font-medium leading-[0] text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
        @click="pullCard(1)"
      >
        <i class="ico xs:text-5xl text-4xl leading-none">arrow_upward</i
        ><span class="hidden">Over</span>
      </button>
      <button
        type="button"
        class="xs:p-4 aspect-square rounded-lg bg-red-700 p-2 font-medium leading-[0] text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300"
        @click="pullCard(0)"
      >
        <i class="ico xs:text-5xl text-4xl leading-none">arrow_downward</i
        ><span class="hidden">Under</span>
      </button>
    </footer>
  </section>
  <transition name="fade">
    <section
      v-show="lost"
      class="absolute start-0 top-0 z-20 h-screen w-screen bg-black bg-opacity-90"
      role="dialog"
      aria-labelledby="lostTitle"
    >
      <h2
        id="lostTitle"
        class="xs:text-7xl absolute start-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col gap-2 text-center text-4xl font-bold uppercase leading-10 text-white"
      >
        <span class="xs:text-8xl text-7xl">💀</span><span> Drik {{ tally }} tåre </span>
      </h2>
      <div class="z-60 absolute inset-0" @click="reset" role="button"></div>
    </section>
  </transition>
</template>
<script setup lang="ts">
import PlayingCard from '@/components/PlayingCard.vue'

import { onMounted, ref, reactive, watch } from 'vue'
import { Guess } from '@/models/overunder'

// Deck
const suits = ['clubs', 'diamonds', 'hearts', 'spades']
const values = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']
const deck: string[] = reactive([])

for (const suit of suits) {
  for (const value of values) {
    const cardName = `${suit}_${value}`
    deck.push(cardName)
  }
}

// Fisher-Yates shuffle algorithm
function shuffle() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[deck[i], deck[j]] = [deck[j], deck[i]]
  }
}

// Setup
const tally = ref(0)
const lost = ref(false)
const currentCard = ref(0)
const lastCard = ref('')

onMounted(() => {
  shuffle()
  lastCard.value = deck[0]
})

// Game
function pullCard(guess: Guess) {
  lost.value = false

  // If the deck has run out, then reshuffle
  if (currentCard.value + 1 === deck.length) {
    shuffle()
    currentCard.value = 0
  } else {
    currentCard.value++
    offsets.push(getOffset())
  }

  handleResult(guess)
  lastCard.value = deck[currentCard.value]
}

function handleResult(guess: Guess) {
  const isOver = checkCardOver(lastCard.value, deck[currentCard.value])

  tally.value++

  if ((isOver && guess) || (!isOver && !guess)) return

  lost.value = true
}

function checkCardOver(last: string, next: string) {
  return values.indexOf(next.split('_')[1]) >= values.indexOf(last.split('_')[1])
}

function reset() {
  lost.value = false
  tally.value = 0
}

// Play area
const offsets: string[] = reactive([])

function getOffset() {
  const rotate = getRandomInt(16)
  const top = getRandomInt(8)
  const start = getRandomInt(8)
  const reverseRotate = getRandomInt(2) ? '-' : ''
  const reverseTop = getRandomInt(2) ? '-' : ''
  const reverseStart = getRandomInt(2) ? '-' : ''

  return `rotate: ${reverseRotate}${rotate}deg; top:${reverseTop}${top}px; left:${reverseStart}${start}px;`
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

watch(currentCard, (newVal: number) => {
  if (newVal == 0) {
    offsets.length = 0
  }
})
</script>
