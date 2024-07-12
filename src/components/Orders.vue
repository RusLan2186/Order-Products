<template>
  <div class="order-container">
    <div class="order-title">
      <h1>Orders /</h1>
      <span>{{ orders.length }}</span>
    </div>
    <div class="order-info">
      <ul class="order-list">
        <li v-for="order in orders" :key="order.id">
          <div class="order" :class="{ min: visibleProducts }" @click="selectOrder(order)">
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
              class="remove-icon"
              :class="{ hidden: visibleProducts }"
              :src="removeIcon"
              alt="remove"
              @click.stop="openModal(order)"
            />
            <div v-if="visibleProducts && selectedOrder.id === order.id" class="snape">
              <span>></span>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="visibleProducts" class="order-details">
        <div class="close" @click="closeOrder">X</div>
        <h2 class="selected-order__title">{{ selectedOrder.title }}</h2>
        <Products
          :products="selectedOrder.products"
          :visibleProducts="visibleProducts"
          @deleteProduct="handleDeleteProduct"
        />
      </div>
    </div>
    <div v-if="orders.length === 0">
      <h1>No orders at the moment</h1>
    </div>
  </div>
  <Modal
    :order="selectedOrder"
    :show="showModal"
    title="order"
    @delete="confirmDeleteOrder"
    @close="closeModal"
  >
    <Products :products="selectedOrder.products" />
  </Modal>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import Products from './Products.vue'
import Modal from './Modal.vue'
import removeIcon from '../icons/removeIcon.svg'
import { formatDate, totalAmount, convertToUAH } from '../utils/utils'

export default {
  name: 'OrdersPage',
  components: {
    Products,
    Modal
  },
  data() {
    return {
      selectedOrder: null,
      removeIcon,
      visibleProducts: false,
      showModal: false
    }
  },
  computed: {
    ...mapState('data', ['products']),
    ...mapGetters('data', ['getOrders']),
    orders() {
      return this.getOrders
    }
  },
  methods: {
    ...mapMutations('data', ['removeOrderById']),
    selectOrder(order) {
      this.selectedOrder = order
      this.visibleProducts = !this.visibleProducts
    },
    closeOrder() {
      this.selectedOrder = null
      this.visibleProducts = false
    },
    openModal(order) {
      this.selectedOrder = order
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    confirmDeleteOrder() {
      this.removeOrderById(this.selectedOrder.id)
      this.selectedOrder = null
      this.showModal = false
    },
    formatDate,
    totalAmount,
    convertToUAH,
    handleDeleteProduct(productId) {
      if (this.selectedOrder) {
        this.selectedOrder.products = this.selectedOrder.products.filter(
          (product) => product.id !== productId
        )
        if (this.selectedOrder.products.length === 0) {
          this.removeOrderById(this.selectedOrder.id)
          this.selectedOrder = null
          this.visibleProducts = false
        }
      }
    }
  }
}
</script>

<style scoped>
.order-container {
  max-width: 1600px;
  box-sizing: border-box;
  margin: 0 auto;
}

.order-title {
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  column-gap: 10px;
}

.order-title span {
  font-size: 25px;
  font-weight: 700;
}
.order-info {
  display: flex;
  column-gap: 20px;
  align-items: flex-start;
}

.order {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 80px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 15px 30px;
  font-size: 22px;
  cursor: pointer;
  transition: 0.3s all ease 0s;
}

.min {
  padding: 0 0px 0 30px;
  height: 100px;
  justify-content: flex-start;
  column-gap: 50px;
}

.order:hover {
  background-color: #f2f2f2;
}

.order span {
  font-size: 19px;
  opacity: 0.6;
}

.order-name {
  width: 500px;
  text-decoration: underline;
  text-decoration-color: #ccc;
}

.order-date {
  text-align: center;
}

.snape {
  background-color: #ccc;
  height: 100px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.snape span {
  color: #fff;
  font-size: 26px;
}
.order-details {
  border: 1px solid #ccc;
  padding: 20px 0;
  position: relative;
}

.hidden {
  display: none;
}

.selected-order__title {
  margin-bottom: 20px;
  padding: 0 30px;
}
</style>
