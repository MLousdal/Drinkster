<template>
  <nav
    class="relative flex h-[52px] items-center justify-between border-b border-black bg-neutral-50 px-4 dark:border-amber-400 dark:bg-neutral-950 md:h-[72px]"
  >
    <RouterLink
      v-if="$route.name != 'home'"
      :to="{ name: 'home' }"
      class="me-auto block p-3 text-xl md:p-5 md:text-2xl"
      ><i class="ico">arrow_back_ios_new</i></RouterLink
    >
    <h1
      class="pointer-events-none absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pt-1 font-serif text-3xl text-amber-400 drop-shadow-title dark:filter-none md:px-6 md:text-5xl"
    >
      {{ $t(`${$route.name?.toString()}.title`) }}
    </h1>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
