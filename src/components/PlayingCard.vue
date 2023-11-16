<template>
  <div class="aspect-card">
    <img :src="`/assets/playing_cards/fronts/${card}.svg`" :alt="card" class="card" />
    <img
      src="/assets/playing_cards/backs/red.svg"
      alt=""
      class="card back absolute inset-0"
      ref="cardElm"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  card: string
}>()
</script>
<style>
.card {
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  width: 100%;
}

.back {
  transform: rotateY(180deg);
}
</style>
