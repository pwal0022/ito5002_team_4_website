<script setup lang="ts">
import Landing from '@/components/Landing.vue'
</script>

<template>
  <div class="home">
    <Landing />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 50vh;
    display: flex;
    align-items: center;
  }
}
</style>
