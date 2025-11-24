<script setup lang="ts">
import Accordion from '@/components/RebateAccordion.vue'
</script>

<template>
  <div class="accordion">
    <Accordion />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .accordion {
    min-height: 50vh;
    display: flex;
    align-items: center;
    width: 100% !important;
    max-width: 100% !important;
  }
}
</style>
