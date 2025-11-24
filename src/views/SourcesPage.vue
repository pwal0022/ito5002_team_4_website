<script setup lang="ts">
import SourcesContent from '@/components/SourcesContent.vue'
</script>

<template>
  <div class="sources">
    <SourcesContent />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .sources {
    min-height: 50vh;
    display: flex;
    align-items: center;
  }
}
</style>
