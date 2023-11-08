<template>
  <nav
    v-if="$route.name != 'home'"
    class="fixed inset-x-0 top-0 z-10 border-b border-black bg-neutral-50"
  >
    <RouterLink :to="{ name: 'home' }" class="me-auto block p-3 text-xl md:p-5 md:text-2xl"
      ><i class="ico">arrow_back_ios_new</i></RouterLink
    >
    <h1
      class="pointer-events-none absolute start-1/2 top-1/2 me-auto -translate-x-1/2 -translate-y-1/2 select-none font-serif text-2xl text-amber-400 drop-shadow-title md:p-6 md:text-5xl"
    >
      {{ $route.name }}
    </h1>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
