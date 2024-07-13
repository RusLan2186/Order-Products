<template>
  <div class="app-container">
    <div>
      <top-menu />
    </div>

    <div class="main-container">
      <div><navigation-menu /></div>
      <div class="router-view">
        <Transition> <RouterView /> </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import TopMenu from './components/TopMenu.vue'
import NavigationMenu from './components/NavigationMenu.vue'
import { RouterView } from 'vue-router'

export default {
  components: {
    TopMenu,
    NavigationMenu,
    RouterView
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f1f5f6;
  box-shadow: 0 0 30px 1px grey;
}

.top-menu {
  height: 70px;
  width: 100%;
  background-color: #ffff;
  box-shadow: 0 0 30px 1px grey;
}

.main-container {
  display: flex;
  flex: 1;
}

.navigation-menu {
  width: 200px;
  height: 100%;
  background-color: #fcfcfc;
  box-shadow: 0 0 30px 1px grey;
}

.router-view {
  margin-top: 120px;
  width: 100%;
  display: flex;
  padding: 0 25px;
}
.v-enter-active,
.v-leave-active {
  transition: transform 0.7s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform:translate(500px)
}
</style>
