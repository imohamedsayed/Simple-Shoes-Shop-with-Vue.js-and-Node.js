<template>
  <div class="product m-auto">
    <div class="product-img text-center">
      <img
        :src="'http://localhost:3000' + product.imageUrl"
        class="img-fluid"
        alt=""
        style="height: 240px"
      />
    </div>
    <div class="product-details mt-2">
      <div class="price-name d-flex justify-content-between">
        <p class="name">{{ product.name }}</p>
        <p class="price">{{ product.price }}</p>
      </div>
      <p :class="`rating-${product.id}`">
        <font-awesome-icon
          icon="fa-solid fa-star"
          style="color: gold"
          v-for="x in +product.averageRating"
          :key="x"
        />
        <font-awesome-icon
          icon="fa-regular fa-star"
          style="color: gold"
          v-for="x in Array.from('x'.repeat(5 - +product.averageRating))"
          :key="x"
        />
      </p>
      <button
        class="btn btn-dark w-100"
        @click="addToCart(product._id)"
        v-if="!state.successMessage && !state.alreadyExisted"
      >
        <font-awesome-icon icon="fa-solid fa-cart-plus " /><span class="ms-2"
          >Add to cart</span
        >
      </button>
      <button
        class="btn btn-success w-100"
        v-else-if="state.successMessage"
        disabled
      >
        <font-awesome-icon icon="fa-solid fa-check-circle " /><span class="ms-2"
          >Added Successfully</span
        >
      </button>
      <button class="btn btn-danger w-100" v-if="state.alreadyExisted" disabled>
        <font-awesome-icon icon="fa-solid fa-xmark-circle " /><span
          class="ms-2"
          >Already in the cart</span
        >
      </button>
      <div class="view">
        <router-link :to="'/products/' + product._id">
          <font-awesome-icon icon="fa-solid fa-eye " />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
export default {
  props: ["product"],
  setup() {
    const state = reactive({
      successMessage: false,
      alreadyExisted: false,
    });

    const addToCart = async (id) => {
      try {
        let res = await axios.post(
          "http://localhost:3000/api/user/64ac6b2636123aefb53a3d0d/cart/",
          {
            product_id: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status == 201) {
          state.successMessage = true;
        }
      } catch (err) {
        state.alreadyExisted = true;

        console.log(
          "Error while adding product to cart : ",
          err.response.data.message
        );
      }
    };

    return { addToCart, state };
  },
};
</script>

<style lang="scss" scoped>
.product {
  background: rgba(14, 14, 88, 0.1);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(171, 165, 165, 0.2);
  width: 260px;
  position: relative;
  .product-details {
    .name {
      font-weight: 600;
    }
  }
  .view {
    position: absolute;
    top: 20px;
    right: 20px;
    transition: all 0.3s ease;
    background: #77777724;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    opacity: 0.1;
    border-radius: 25px;
    &:hover {
      opacity: 0.8;
      transform: scale(1.2);
    }
  }
}
</style>
