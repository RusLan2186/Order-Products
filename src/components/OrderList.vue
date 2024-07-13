<template>
  <div class="order" :class="{ min: visibleProducts }" @click="selectOrder">
    <p v-if="!visibleProducts" class="order-name">{{ order.title }}</p>
    <div class="order-length">
      <p>{{ order.products.length }}</p>
      <span>Products</span>
    </div>
    <div class="order-date">
      <span>{{ formatDate(order.date, 'short') }}</span>
      <p>{{ formatDate(order.date, 'long') }}</p>
    </div>
    <div v-if="!visibleProducts" class="order-price">
      <span>{{ totalAmount(order.products) }}$</span>
      <p>{{ convertToUAH(totalAmount(order.products)) }} UA</p>
    </div>
    <img
      v-if="!visibleProducts"
      class="remove-icon"
      :src="removeIcon"
      alt="remove"
      @click.stop="$emit('removeOrder', order)"
    />
    <div v-if="visibleProducts && order.id === selectedOrderId" class="order-snape">
      <span>></span>
    </div>
  </div>
</template>

<script>
import { formatDate, totalAmount, convertToUAH } from '../utils/utils'
import removeIcon from '../icons/removeIcon.svg'

export default {
  data(){
    return {
      removeIcon
    }
  },
  props: {
    order: {
      type: Object,
      required: true
    },
    visibleProducts: {
      type: Boolean,
      default: false
    },
    selectedOrderId: {
      type: [Number, String],
      default: null
    }
  },
  methods: {
    selectOrder() {
      this.$emit('selectOrder', this.order.id)
    },
    formatDate,
    totalAmount,
    convertToUAH
  }
}
</script>

<style scoped>
.order {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 50px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px 30px;
  font-size: 22px;
  cursor: pointer;
  transition: 0.3s all ease 0s;
  background-color: #ffff;
}

.order:hover {
  background-color: #f2f2f2;
}

.order span {
  font-size: 19px;
  opacity: 0.6;
}

.min {
  padding: 0 0px 0 30px;
  height: 100px;
  justify-content: flex-start;
  column-gap: 50px;
}

.order-name {
  width: 40%;
  text-decoration: underline;
  text-decoration-color: #ccc;
}

.order-date {
  text-align: center;
}

.order-price {
  width: 15%;
}

.order-snape {
  background-color: #ccc;
  height: 100px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.order-snape span {
  color: #fff;
  font-size: 26px;
}
</style>
