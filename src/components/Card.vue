<template>
  <article
    class="block p-6 bg-white border border-neutral-200 rounded-lg shadow hover:bg-neutral-100 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700"
  >
    <img v-if="image" :src="image" alt="" class="rounded-t-lg w-full" />
    <h2 class="mt-2 text-2xl text-center font-bold tracking-tight text-neutral-900 dark:text-white">
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
