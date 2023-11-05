<template>
  <div class="min-h-screen">
    <header class="mx-auto max-w-prose py-12">
      <h1
        class="text-5xl font-bold flex gap-4 items-center justify-center text-neutral-950 dark:text-amber-300"
      >
        <img src="/beer.svg" alt="" class="w-12" />
        Drink'ster
      </h1>
    </header>
    <section class="container grid md:grid-cols-2 xl:grid-cols-4 gap:8 xl:gap-12">
      <RouterLink :to="{ name: 'overunder' }">
        <Card title="Over / Under" image="/overunder.svg" class="block"></Card>
      </RouterLink>
      <RouterLink :to="{ name: 'overunder' }">
        <Card title="Over / Under" image="/overunder.svg" class="block"></Card>
      </RouterLink>
      <RouterLink :to="{ name: 'overunder' }">
        <Card title="Over / Under" image="/overunder.svg" class="block"></Card>
      </RouterLink>
      <RouterLink :to="{ name: 'overunder' }" class="block">
        <Card title="Over / Under" image="/overunder.svg"></Card>
      </RouterLink>
    </section>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Card from '@/components/Card.vue'
</script>
