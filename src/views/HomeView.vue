<template>
  <header class="mx-auto max-w-prose py-12">
    <h1
      class="font-serif text-amber-400 drop-shadow-title text-5xl leading-none font-bold flex gap-4 items-center justify-center"
    >
      <img src="/beer.svg" alt="" class="w-16" />
      <span>Drink'ster</span>
    </h1>
  </header>
  <section class="container grid md:grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-12">
    <RouterLink :to="{ name: 'Over / Under' }">
      <GameCard title="Over / Under" image="/overunder.svg" class="block"></GameCard>
    </RouterLink>
    <RouterLink :to="{ name: 'Over / Under' }">
      <GameCard title="Over / Under" image="/overunder.svg" class="block"></GameCard>
    </RouterLink>
    <RouterLink :to="{ name: 'Over / Under' }">
      <GameCard title="Over / Under" image="/overunder.svg" class="block"></GameCard>
    </RouterLink>
    <RouterLink :to="{ name: 'Over / Under' }" class="block">
      <GameCard title="Over / Under" image="/overunder.svg"></GameCard>
    </RouterLink>
  </section>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import GameCard from '@/components/GameCard.vue'
</script>
