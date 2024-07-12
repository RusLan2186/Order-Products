
import { createStore } from 'vuex';
import data from './dataModule'; 

const store = createStore({
  modules: {
    data 
  }
});

export default store;

