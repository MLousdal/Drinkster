<template>
  <section class="container flex min-h-[calc(100vh-53px)] flex-col items-center justify-around">
    <header>
      <h2
        class="flex items-center gap-4 font-mono text-4xl font-bold leading-9 sm:text-6xl xl:text-7xl"
      >
        <i class="ico">sports_bar</i> <span>x</span> <span>{{ tally }}</span>
      </h2>
    </header>
    <div class="aspect-card relative w-4/6 min-w-[156px] max-w-[468px]">
      <img
        v-for="card in currentCard"
        :key="card"
        :src="`/playing_cards/fronts/${deck[card - 1]}.svg`"
        alt=""
        class="absolute w-full scale-90"
        :style="offsets[card]"
      />
      <transition name="spin">
        <PlayingCard
          :card="deck[currentCard]"
          :key="currentCard"
          class="absolute inset-0 z-30 shadow-xl"
        ></PlayingCard>
      </transition>
    </div>
    <footer class="flex items-center gap-8">
      <template v-if="lost">
        <button
          type="button"
          class="rounded-lg bg-blue-700 p-2 text-4xl font-medium leading-none text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:p-4 sm:text-5xl"
          @click="reset"
        >
          Drukket!
        </button>
      </template>
      <template v-else>
        <button
          type="button"
          class="rounded-lg bg-green-700 p-2 text-4xl font-medium leading-none text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 sm:p-4 sm:text-5xl"
          @click="pullCard(1)"
        >
          <i class="ico">arrow_upward</i><span class="hidden">Over</span>
        </button>
        <button
          type="button"
          class="rounded-lg bg-red-700 p-2 text-4xl font-medium leading-none text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 sm:p-4 sm:text-5xl"
          @click="pullCard(0)"
        >
          <i class="ico">arrow_downward</i><span class="hidden">Under</span>
        </button>
      </template>
    </footer>
  </section>
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
