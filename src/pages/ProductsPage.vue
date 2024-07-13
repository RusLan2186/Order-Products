<template>
  <div @click="hideFilterList" class="product-page__container">
    <ProductFilter
        :searchQuery="searchQuery"
        :selectedFilter="selectedFilter"
        :filterOptions="filterOptions"
        @update:searchQuery="searchQuery = $event"
        @update:selectedFilter="selectedFilter = $event"
        ref="productFilter"
      />

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
    <teleport to="#modals">
      <Modal
        :order="selectedProduct"
        :show="showModal"
        title="product"
        @delete="confirmDeleteProduct"
        @close="closeModal"
      >
        <ModalHeader :selectedProduct="selectedProduct" />
      </Modal>
    </teleport>
  </div>
</template>

<script>
import removeIcon from '../icons/removeIcon.svg'
import { mapMutations, mapState } from 'vuex'
import Modal from '../components/Modal.vue'
import ProductDetails from '../components/ProductDetails.vue'
import ModalHeader from '../components/ModalHeader.vue'
import ProductFilter from '../components/ProductsFilter.vue'

export default {
  name: 'ProductsData',
  components: {
    Modal,
    ProductDetails,
    ModalHeader,
    ProductFilter
  },
  data() {
    return {
      removeIcon,
      showModal: false,
      selectedProduct: null,
      selectedFilter: 'default',
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
    confirmDeleteProduct() {
      if (this.selectedProduct) {
        this.removeProductById(this.selectedProduct.id)
        this.selectedProduct = null
        this.showModal = false
      }
    },
    hideFilterList() {
      this.$refs.productFilter.hideFilterList();
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
