<template>
  <header class="mx-auto max-w-prose py-12">
    <h1
      class="text-5xl font-bold flex gap-4 items-center justify-center text-neutral-950 dark:text-amber-300"
    >
      Over / Under
    </h1>
  </header>
  <section class="container flex flex-col items-center gap-6">
    <header>
      <h2 class="text-3xl font-bold" v-if="tally">Optælling: {{ tally }}</h2>
    </header>
    <PlayingCard :card="deck[currentCard]"></PlayingCard>
    <footer>
      <button
        type="button"
        class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:cursor-not-allowed"
        @click="pullCard(1)"
        :disabled="lost"
      >
        Over
      </button>
      <button
        type="button"
        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 disabled:cursor-not-allowed"
        @click="pullCard(0)"
        :disabled="lost"
      >
        Under
      </button>
    </footer>
  </section>
  <div
    v-show="lost"
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full grid place-content-center"
  >
    <div class="relative w-full min-w-sm max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Du tabte 💀</p>
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">{{ tally }}</p>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="reset"
          >
            Drukket!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import PlayingCard from '@/components/PlayingCard.vue'
import { onMounted, ref, reactive } from 'vue'
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
</script>
