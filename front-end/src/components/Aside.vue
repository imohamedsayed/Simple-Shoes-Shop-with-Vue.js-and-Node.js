<template>
  <aside>
    <ul class="list-unstyled">
      <!-- <router-link :to="{ name: 'home' }"
        ><font-awesome-icon icon="fa-solid fa-home" /><span class="ms-2"
          >Home</span
        ></router-link
      > -->
      <router-link :to="{ name: 'products' }"
        ><font-awesome-icon icon="fa-solid fa-shoe-prints " /><span class="ms-2"
          >Products</span
        ></router-link
      >
      <router-link :to="{ name: 'cart' }">
        <font-awesome-icon icon="fa-solid fa-cart-shopping " /><span
          class="ms-2"
          >cart</span
        ></router-link
      >
    </ul>
  </aside>
</template>

<script>
export default {};
</script>

<style lang="scss">
aside {
  width: 180px;
  box-shadow: 1px 10px 10px 1px rgba(0, 0, 0, 0.2);
  padding: 20px;
  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
    a {
      font-weight: bold;
      color: #2c3e50;
      text-decoration: none;
      padding: 10px;
      transition: all 0.3s ease;
      &:hover {
        background: #f01a1a5c;
      }
      &.router-link-exact-active {
        color: #fff;
        background: #e63c3c96;
        border-left: 4px solid #e90000;
      }
    }
  }
}
</style>
