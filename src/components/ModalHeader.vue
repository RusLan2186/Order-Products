<template>
  <div>
    <div class="product-page">
      <div class="product-circle" :class="{ free: selectedProduct.isFree }"></div>
      <img class="product-icon" :src="selectedProduct.img" :alt="selectedProduct.name" />
      <div class="product-modal__name">
        <p>{{ selectedProduct.name }}</p>
        <P class="product-min"> S/N {{ selectedProduct.sn }}</P>
      </div>

      <div class="product-status">
        <p style="color: #55a45e" v-if="selectedProduct.isFree">Free</p>
        <p v-else>Under repair</p>
      </div>
      <div class="product-type">
        <p>{{ selectedProduct.type }}</p>
      </div>
    <p>{{ selectedProduct.specification }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedProduct: {
      type: Array,
    }
  },
}
</script>

<style>

.product-modal__name{
  width: 30%;
}
</style>
