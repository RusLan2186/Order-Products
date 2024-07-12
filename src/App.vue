<template>
  <div class="app-container">
    <div>
      <top-menu />
    </div>

    <div class="main-container">
      <div><navigation-menu /></div>
      <div class="router-view"><RouterView /></div>
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
  margin-top: 150px;
  width: 100%;
  display: flex;
}
</style>
