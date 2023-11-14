<template>
  <section class="container flex flex-col md:flex-row gap-8 xl:gap-12 justify-center mt-12">
    <RouterLink :to="{ name: 'overunder' }">
      <GameCard :title="$t('overunder.title')" image="/overunder.svg" class="block"></GameCard>
    </RouterLink>
    <RouterLink :to="{ name: 'overunder' }">
      <GameCard :title="$t('overunder.title')" image="/overunder.svg" class="block"></GameCard>
    </RouterLink>
  </section>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import GameCard from '@/components/GameCard.vue'
</script>
