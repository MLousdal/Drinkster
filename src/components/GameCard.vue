<template>
  <RouterLink :to="{ name: to }">
    <article
      class="flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-6 shadow transition hover:bg-neutral-100 dark:border-amber-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 md:gap-8"
    >
      <img v-if="image" :src="image" alt="" class="rounded-t-lg w-1/4 md:w-1/3" />
      <h2 class="text-2xl lg:text-4xl font-bold capitalize tracking-tight">
        {{ title }}
      </h2>
    </article>
  </RouterLink>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  image?: string
  title: string
  to: string
}>()
</script>
