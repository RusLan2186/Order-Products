<template>
  <div class="product-circle" :class="{ free: product.isFree }"></div>
  <img class="product-icon" :src="product.img" :alt="product.name" />
  <div class="product-name">
    <p>{{ product.name }}</p>
    <p class="product-min">S/N {{ product.sn }}</p>
  </div>
  <div class="product-status">
    <p style="color: #55a45e" v-if="product.isFree">Free</p>
    <p v-else>Under repair</p>
  </div>
  <div class="product-type">
    <p>{{ product.type }}</p>
  </div>

  <div class="product-price">
    <p class="product-min">{{ product.price }}$</p>
    <p>{{ convertToUAH(product.price) }} UAH</p>
  </div>
  <div class="product-guarantee">
    <p><span class="product-min">from</span> {{ formatDate(product.guarantee.start, 'long') }}</p>
    <p><span class="product-min">to </span> {{ formatDate(product.guarantee.end, 'long') }}</p>
  </div>
  <p class="product-order__title">Order: {{ getOrderDetails(product.order).title }}</p>
  <div>
    <p>Order Date: {{ getOrderDetails(product.order).date }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { formatDate, convertToUAH } from '../utils/utils'
import removeIcon from '../icons/removeIcon.svg'
export default {
  data() {
    return {
      removeIcon
    }
  },
  props: {
    product: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters('data', ['getOrders'])
  },
  methods: {
    formatDate,
    convertToUAH,
    getOrderDetails(orderId) {
      const order = this.getOrders.find((order) => order.id === orderId)
      return order
        ? { title: order.title, date: this.formatDate(order.date, 'long') }
        : { title: 'Unknown Order', date: 'Unknown Date' }
    }
  }
}
</script>

<style>

</style>
