<template>
  <article
    class="block rounded-lg border border-neutral-200 bg-white p-6 shadow hover:bg-neutral-100 dark:hover:bg-neutral-700 dark:bg-neutral-950 dark:border-neutral-600 transition"
  >
    <img v-if="image" :src="image" alt="" class="w-full rounded-t-lg" />
    <h2 class="mt-2 text-center text-2xl font-bold tracking-tight">
      {{ title }}
    </h2>
  </article>
</template>
<script setup lang="ts">
defineProps<{
  image?: string
  title: string
}>()
</script>
