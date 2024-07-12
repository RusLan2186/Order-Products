<template>
  <div class="navigation-menu">
    <nav class="links">
      <RouterLink to="/products">Products</RouterLink>
      <RouterLink to="/orders">Orders</RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style>
.navigation-menu {
  height: 100%;
  background: #f0f3f5;
  display: flex;
  flex-direction: column;
  width: 200px;
}
.links {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 100px;
  align-items: center;
}

.links a {
  padding-top: 5px;
  padding-bottom: 5px;
  text-transform: uppercase;
  color: black;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  height: 35px;
  box-sizing: border-box;
  width: 60%;
  text-align: center;
}

.router-link-exact-active {
  border-bottom: 5px #55a45e solid;
}
</style>
