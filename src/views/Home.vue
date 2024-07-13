<template>
  <main class="main">
    <Products />
  </main>
</template>

<script setup>
import Products from '@/pages/ProductsPage.vue'
</script>

<style>
.main{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 1400px;
  margin: 0 auto;
}
</style>