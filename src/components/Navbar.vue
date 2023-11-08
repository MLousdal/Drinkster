<template>
  <nav v-if="$route.name != 'home'" class="relative border-b border-black">
    <RouterLink :to="{ name: 'home' }" class="me-auto block p-3 text-xl"
      ><i class="ico">arrow_back_ios_new</i></RouterLink
    >
    <h1
      class="absolute start-1/2 top-1/2 me-auto -translate-x-1/2 -translate-y-1/2 font-serif text-2xl text-amber-400 drop-shadow-title"
    >
      {{ $route.name }}
    </h1>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
