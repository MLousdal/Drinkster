<template>
  <Navbar></Navbar>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <div
        :key="route.fullPath"
        class="container h-[calc(100vh-52px)] md:h-[calc(100vh-72px)]"
      >
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>
