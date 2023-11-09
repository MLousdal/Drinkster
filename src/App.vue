<template>
  <Navbar></Navbar>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <div :key="route.fullPath">
        <component :is="Component"></component>
      </div>
    </transition>
  </router-view>
  <ReloadPrompt></ReloadPrompt>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'
</script>
