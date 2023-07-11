<template>
  <header
    class="bg-light d-flex justify-content-between align-items-center text-dark"
  >
    <div class="logo">
      <h2 @click="$router.push('/products')" style="cursor: pointer">
        <font-awesome-icon icon="fa-brands fa-shopify" /><span class="ms-2"
          >Shop</span
        >
      </h2>
    </div>
    <div class="links">
      <button
        class="btn btn-outline-dark rounded-5"
        @click="$router.push('/cart')"
      >
        <font-awesome-icon icon="fa-solid fa-cart-shopping " /><span
          class="ms-2"
          >cart</span
        >
      </button>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
header {
  padding: 10px 15px;
  color: #fff;
}
</style>
