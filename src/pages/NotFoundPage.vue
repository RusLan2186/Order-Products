<template>
 
 <div class="not-found">
  <h1>404</h1>
  <p>Not found</p>
 </div>
</template>

<script>
export default {

}
</script>

<style>
.not-found{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  row-gap:10px;
}

.not-found h1{
  color:red;
  font-size: 150px;
  font-weight: 700;
}

.not-found p{
  font-size: 50px;
  font-weight: 700;
}
</style>