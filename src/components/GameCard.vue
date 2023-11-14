<template>
  <RouterLink :to="{name: to}">
    <article
      class="block rounded-lg border border-neutral-200 bg-white p-6 shadow transition hover:bg-neutral-100 dark:border-amber-400 dark:bg-neutral-900 dark:hover:bg-neutral-800"
    >
      <img v-if="image" :src="image" alt="" class="w-full rounded-t-lg" />
      <h2 class="mt-2 text-center text-2xl font-bold capitalize tracking-tight">
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
