<template>
  <div>
    <div v-if="products.length === 0" class="no-products">No products</div>
    <div v-else>
      <div v-for="product in products" :key="product.id" class="product">
        <img class="product-icon" :src="product.img" :alt="product.name" />
        <div class="product-circle" :class="{ free: product.isFree }"></div>
        <div class="selected-product__name">
          <p>{{ product.name }}</p>
          <span>S/N {{ product.sn }}</span>
        </div>

        <p class="product-specification">{{ product.specification }}</p>
        <div class="product-status">
          <p style="color: #55a45e" v-if="product.isFree">Free</p>
          <p v-else>Under repair</p>
         
        </div>
        <div>
            <img
              v-if="visibleProducts"
              class="remove-icon"
              :class="{ 'remove-icon__act': visibleProducts }"
              :src="removeIcon"
              alt="remove"
              @click.stop="openModal(product)"
            />
          </div>
      </div>
    </div>
    <teleport to="#modals">
    <Modal
      :order="selectedProduct"
      :show="showModal"
      title="product"
      @delete="confirmDeleteProduct"
      @close="closeModal"
    >
   <ModalHeader :selectedProduct="selectedProduct"/> 
    </Modal>
  </teleport>
  </div>
</template>

<script>
import removeIcon from '../icons/removeIcon.svg'
import Modal from './Modal.vue'
import ModalHeader from './ModalHeader.vue'

export default {
  name: 'ProductsData',
  components: {
    Modal,
    ModalHeader
  },
  data() {
    return {
      removeIcon,
      showModal: false,
      selectedProduct: null
    }
  },
  props: {
    products: {
      type: Array,
      required: true
    },
    visibleProducts: {
      type: Boolean
    }
  },
  methods: {
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
        this.$emit('deleteProduct', this.selectedProduct.id)
        this.selectedProduct = null
        this.showModal = false
      }
    }
  }
}
</script>

<style scoped>
.selected-product__name{
  width: 60%;
}

.no-products {
  text-align: center;
  color: red;
}
</style>
