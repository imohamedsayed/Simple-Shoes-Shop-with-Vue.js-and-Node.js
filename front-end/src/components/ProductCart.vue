<template>
  <div class="cart-item mb-4">
    <div class="img">
      <img
        :src="'http://localhost:3000' + product.imageUrl"
        class="img-fluid"
        alt=""
      />
    </div>
    <div class="info">
      <h2>{{ product.name }}</h2>
      <p class="rating">
        <font-awesome-icon
          icon="fa-solid fa-star"
          style="color: gold"
          v-for="x in Array.from('x'.repeat(+product.averageRating))"
          :key="x"
        />
        <font-awesome-icon
          icon="fa-regular fa-star"
          style="color: gold"
          v-for="x in Array.from('x'.repeat(5 - +product.averageRating))"
          :key="x"
        />
      </p>
      <div class="price">
        <p>{{ product.price }}</p>
      </div>
      <div class="delete-btn" @click="$emit('remove', product._id)">
        <font-awesome-icon icon="fa-solid fa-trash" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
};
</script>

<style lang="scss" scoped>
.cart-item {
  display: flex;
  align-items: center;
  height: 180px;
  gap: 40px;
  background: #72c8f056;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  position: relative;
  .delete-btn {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 40px;
    background: crimson;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    display: grid;
    place-content: center;
    color: white;
    opacity: 0.7;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease-out;
    &:hover {
      opacity: 1;
    }
  }
  .img {
    flex: 0 0 30;
    max-width: 30%;
    img {
      width: 100%;
      max-height: 182px;
    }
  }
  .info {
    flex: 1;
    .price {
      font-weight: bold;
      font-size: 1.2rem;
    }
  }
}
</style>
