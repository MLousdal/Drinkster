<template>
  <section class="view">
    <div class="grid md:grid-cols-2 gap-8 xl:gap-12">
      <GameCard :title="$t('overunder.title')" image="/assets/overunder.png" to="overunder" />
      <GameCard :title="$t('dice.title')" image="/assets/dice.png" to="dice" />
    </div>
    <footer class="me-auto">
      <LanguageSwitcher></LanguageSwitcher>
    </footer>
  </section>
</template>
<script setup lang="ts">
import GameCard from '@/components/GameCard.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
</script>
