<template>
  <header class="mx-auto max-w-prose py-12">
    <h1
      class="text-5xl font-bold flex gap-4 items-center justify-center text-neutral-950 dark:text-amber-300"
    >
      Over / Under
    </h1>
  </header>
  <section class="container flex flex-col items-center gap-20">
    <header>
      <h2 class="text-3xl font-bold">
        <template v-if="lost">Du tabte 💀</template>
        <template v-else>Optælling</template>: {{ tally }}
      </h2>
    </header>
    <div class="relative">
      <img
        v-for="card in currentCard"
        :key="card"
        :src="`/playing_cards/fronts/${deck[card - 1]}.svg`"
        alt="card back"
        class="absolute scale-90"
        :style="offsets[card]"
      />
      <PlayingCard :card="deck[currentCard]" class="shadow-xl relative z-10"></PlayingCard>
    </div>
    <footer>
      <template v-if="lost">
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-5xl p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="reset"
        >
          Drukket!
        </button>
      </template>
      <template v-else>
        <button
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-5xl p-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          @click="pullCard(1)"
        >
          <i class="ico">thumb_up</i><span class="hidden">Over</span>
        </button>
        <button
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-5xl p-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          @click="pullCard(0)"
        >
          <i class="ico">thumb_down</i><span class="hidden">Under</span>
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
