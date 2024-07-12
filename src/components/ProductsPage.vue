<template>
  <div class="product-page__container">
    <div class="product-page__header">
      <h1 class="title">Products</h1>
      <input type="text" placeholder="Search..." v-model="searchQuery" class="search-input" />
      <div @click.stop class="filter__wrapper">
        Type: <span class="filter__title" @click="toggleFilterList">{{ selectedFilterText }}</span>
        <ul class="filter__list" v-if="isVisibleFilterList">
          <li
            v-for="option in filterOptions"
            :key="option.value"
            @click="selectFilter(option.value)"
          >
            {{ option.text }}
          </li>
        </ul>
      </div>
    </div>

    <div v-if="filteredProducts.length > 0">
      <div v-for="product in filteredProducts" :key="product.id" class="product-page">
        <div class="product-circle" :class="{ free: product.isFree }"></div>
        <img class="product-icon" :src="product.img" :alt="product.name" />
        <div class="product-name">
          <p>{{ product.name }}</p>
          <p>S/N {{ product.sn }}</p>
        </div>
        <div class="product-status">
          <p style="color: #55a45e" v-if="product.isFree">Free</p>
          <p v-else>Under repair</p>
        </div>
        <div class="product-type">
          <p>{{ product.type }}</p>
        </div>

        <div class="product-price">
          <p>{{ product.price }}$</p>
          <p>{{ convertToUAH(product.price) }} UAH</p>
        </div>
        <div class="product-guarantee">
          <p>from {{ formatDate(product.guarantee.start, 'long') }}</p>
          <p>to {{ formatDate(product.guarantee.end, 'long') }}</p>
        </div>
        <p class="product-order__title">Order: {{ getOrderDetails(product.order).title }}</p>
        <div>
          <p>Order Date: {{ getOrderDetails(product.order).date }}</p>
        </div>

        <img
          class="remove-icon"
          :class="{ 'remove-icon__act': visibleProducts }"
          :src="removeIcon"
          alt="remove"
          @click.stop="openModal(product)"
        />
      </div>
    </div>
    <div v-else class="no-products">
      <h1>No products at the moment</h1>
    </div>

    <Modal
      :order="selectedProduct"
      :show="showModal"
      title="product"
      @delete="confirmDeleteProduct"
      @close="closeModal"
    >
    </Modal>
  </div>
</template>

<script>
import removeIcon from '../icons/removeIcon.svg'
import { mapGetters, mapMutations, mapState } from 'vuex'
import Modal from './Modal.vue'
import { formatDate, convertToUAH } from '../utils/utils'

export default {
  name: 'ProductsData',
  components: {
    Modal
  },
  data() {
    return {
      removeIcon,
      showModal: false,
      selectedProduct: null,
      selectedFilter: 'default',
      isVisibleFilterList: false,
      filterOptions: [
        { value: 'default', text: 'Default' },
        { value: 'monitors', text: 'Monitors' },
        { value: 'CPU', text: 'CPU' },
        { value: 'motherboard', text: 'Motherboard' }
      ],
      searchQuery: ''
    }
  },
  computed: {
    ...mapState('data', ['products']),
    ...mapGetters('data', ['getOrders']),
    selectedFilterText() {
      const selectedOption = this.filterOptions.find(
        (option) => option.value === this.selectedFilter
      )
      return selectedOption ? selectedOption.text : 'Select option'
    },
    filteredProducts() {
      let products = this.products
      if (this.selectedFilter !== 'default') {
        products = products.filter((product) => product.type === this.selectedFilter)
      }
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        products = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.specification.toLowerCase().includes(query)
        )
      }
      return products
    }
  },
  methods: {
    ...mapMutations('data', ['removeProductById']),
    openModal(product) {
      this.selectedProduct = product
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.selectedProduct = null
    },
    toggleFilterList() {
      this.isVisibleFilterList = !this.isVisibleFilterList
    },
    selectFilter(value) {
      this.isVisibleFilterList = false
      this.selectedFilter = value
    },
    confirmDeleteProduct() {
      if (this.selectedProduct) {
        this.removeProductById(this.selectedProduct.id)
        this.selectedProduct = null
        this.showModal = false
      }
    },
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

<style scoped>
.product-page__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 100px;
}

.product-page__header {
  display: flex;
  justify-content: flex-start;
  column-gap: 25px;
  align-items: center;
  margin-bottom: 30px;
  width: 650px;
}

.search-input {
  padding: 5px;
  font-size: 16px;
  margin-right: 20px;
}

.product-title {
  display: flex;
  column-gap: 15px;
  font-size: 20px;
  width: 100%;
}

.filter__wrapper {
  position: relative;
  width: 20%;
  z-index: 50;
}

.filter__title {
  cursor: pointer;
  margin-left: 5px;
  transition: 0.3s all ease 0s;
  color: #55a45e;
}

.filter__title:hover {
  color: rgb(23, 23, 23);
}

.filter__list {
  margin-top: 5px;
  position: absolute;
  cursor: pointer;
  left: 0;
  border: 2px solid #55a45e;
  background-color: #fff;
  border-radius: 12px;
}

.filter__list li {
  padding: 5px 10px;
  transition: 0.3s all ease 0s;
  width: 100%;
}

.filter__list li:hover {
  background-color: #55a45e;
  color: #fff;
}

.product-page {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 30px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  padding: 10px 25px;
  text-align: left;
  font-size: 16px;
}

.product-name {
  width: 20%;
}

.product-type {
  width: 10%;
}

.product-price {
  width: 10%;
}

.product-guarantee {
  width: 15%;
}

.product-order__title {
  width: 25%;
}

.no-products {
  text-align: center;
  color: red;
}
@media (max-width: 1400px){
  .product-page__container {
  
  padding: 0px;
}
}
</style>
