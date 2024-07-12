import { products, orders } from '../MockData';

export default {
  namespaced: true,
  state: {
    orders,
    products
  },
  getters: {
    getOrders(state) {
      return state.orders.map(order => ({
        ...order,
        products: state.products.filter(product => product.order === order.id)
      }));
    },
    getOrderById: (state) => (id) => {
      const order = state.orders.find(order => order.id === id);
      return {
        ...order,
        products: state.products.filter(product => product.order === id)
      };
    },
    getProducts: (state) => {
      return state.products
    }
  },
  mutations: {
    removeOrderById(state, orderId) {
      state.orders = state.orders.filter(order => order.id !== orderId);
      state.products = state.products.filter(product => product.order !== orderId);
    },
    removeProductById(state, id) {
      state.products = state.products.filter(product => product.id !== id);
    }
  },
  actions: {
   
  }
};
