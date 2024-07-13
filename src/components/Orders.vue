<template>
  <div class="order-container">
    <div class="order-title">
      <h1>Orders /</h1>
      <span>{{ orders.length }}</span>
    </div>
    <div class="order-info">
      <ul>
        <li class="order-list" v-for="order in orders" :key="order.id">
          <OrderList
            :order="order"
            :visibleProducts="visibleProducts"
            :selectedOrderId="selectedOrder?.id"
            @selectOrder="selectOrder"
            @removeOrder="openModal"
          />
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
    <teleport to="#modals">
      <Modal
        :order="selectedOrder"
        :show="showModal"
        title="order"
        @delete="confirmDeleteOrder"
        @close="closeModal"
      >
        <Products :products="selectedOrder.products" />
      </Modal>
    </teleport>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import Products from './Products.vue'
import Modal from './Modal.vue'
import OrderList from './OrderList.vue'

export default {
  name: 'OrdersPage',
  components: {
    Products,
    Modal,
    OrderList
  },
  data() {
    return {
      selectedOrder: null,
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
    },
    selectOrder(orderId) {
      if (this.selectedOrder?.id === orderId) {
        this.closeOrder()
        this.visibleProducts = false
      } else {
        this.selectedOrder = this.orders.find(order => order.id === orderId)
        this.visibleProducts = true
      }
    }
  }
}
</script>

<style scoped>
.order-container {
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

.order-list {
}

.order-details {
  border: 1px solid #ccc;
  padding: 20px 0;
  position: relative;
  background-color: #ffff;
}

.selected-order__title {
  margin-bottom: 20px;
  padding: 0 30px;
}

.min {
  padding: 0 0px 0 30px;
  height: 100px;
  justify-content: flex-start;
  column-gap: 50px;
}
</style>
