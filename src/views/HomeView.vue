<template>
  <section class="container mt-12 flex flex-col justify-center gap-8 md:flex-row xl:gap-12">
    <GameCard :title="$t('overunder.title')" image="/overunder.svg" class="block" to="overunder" />
    <GameCard :title="$t('dice.title')" image="/dice.svg" class="block" to="dice" />
  </section>
</template>
<script setup lang="ts">
import GameCard from '@/components/GameCard.vue'
</script>
