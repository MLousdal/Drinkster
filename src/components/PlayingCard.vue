<template>
  <img :src="`/playing_cards/fronts/${card}.svg`" :alt="card">
</template>

<script setup lang="ts">
defineProps<{
  card: string
}>()
</script>
