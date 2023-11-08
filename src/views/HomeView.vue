<template>
  <header class="mx-auto -mt-6 max-w-prose pb-8">
    <h1
      class="flex items-center justify-center gap-4 font-serif text-5xl font-bold leading-none text-amber-400 drop-shadow-title"
    >
      <img src="/beer.svg" alt="" class="h-16 w-16" />
      <span>Drink'ster</span>
    </h1>
  </header>
  <section class="container grid gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-12">
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
