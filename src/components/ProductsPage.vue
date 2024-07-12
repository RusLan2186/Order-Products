<template>
  <div @click="this.isVisibleFilterList = false" class="product-page__container">
    <div class="product-page__header">
      <h1 class="title">Products</h1>
      <div class="search__wrapper">
        <input
          type="text"
          placeholder="Search..."
          v-model="searchQuery"
          class="search-input"
          :class="{ expanded: isInputFocused }"
          @focus="isInputFocused = true"
          @blur="isInputFocused = false"
        />
        <span v-if="searchQuery" @mousedown.prevent="handleClearSearch" class="search__clear"
          >X</span
        >
      </div>

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
        <ProductDetails :product="product" />
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
      <div>
        <div class="product-page">
          <div class="product-circle" :class="{ free: selectedProduct.isFree }"></div>
          <img class="product-icon" :src="selectedProduct.img" :alt="selectedProduct.name" />
          <div>
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
    </Modal>
  </div>
</template>

<script>
import removeIcon from '../icons/removeIcon.svg'
import { mapMutations, mapState } from 'vuex'
import Modal from './Modal.vue'
import ProductDetails from './ProductDetails.vue'

export default {
  name: 'ProductsData',
  components: {
    Modal,
    ProductDetails
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
      searchQuery: '',
      isInputFocused: false
    }
  },
  computed: {
    ...mapState('data', ['products']),
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
    handleClearSearch() {
      this.isInputFocused = true
      this.searchQuery = ''
    }
  }
}
</script>

<style scoped>
.product-page__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 100px;
}

.product-page__header {
  display: flex;
  justify-content: flex-start;
  column-gap: 5px;
  align-items: center;
  margin-bottom: 30px;
  width: 700px;
}

.search__wrapper {
  position: relative;
  width: 60%;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
}

.search-input {
  padding: 5px;
  font-size: 16px;
  margin-right: 20px;
  transition: width 0.3s ease;
  width: 200px;
}
.expanded {
  width: calc(80% - 40px);
  left: -20px;
  outline: none;
}

.search__clear {
  display: inline-block;
  cursor: pointer;
  transition: width 0.3s ease;
  transform: translateX(-50px);
}

.search__clear:hover {
  color: #55a45e;
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

.no-products {
  text-align: center;
  color: red;
}
@media (max-width: 1400px) {
  .product-page__container {
    padding: 0px;
  }
}
</style>
