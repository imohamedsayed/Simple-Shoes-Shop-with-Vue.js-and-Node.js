<template>
  <div class="product-view" v-if="state.product">
    <div class="container">
      <div class="p-view">
        <div class="left">
          <div class="img">
            <img
              :src="'http://localhost:3000' + state.product.imageUrl"
              alt=""
            />
          </div>
          <div class="rating"></div>
        </div>
        <div class="right">
          <h2>{{ state.product.name }}</h2>
          <p :class="`rating-${state.product._id}`">
            <font-awesome-icon
              icon="fa-solid fa-star"
              style="color: gold"
              v-for="x in Array.from('x'.repeat(+state.product.averageRating))"
              :key="x"
            />
            <font-awesome-icon
              icon="fa-regular fa-star"
              style="color: gold"
              v-for="x in Array.from(
                'x'.repeat(5 - +state.product.averageRating)
              )"
              :key="x"
            />
          </p>
          <p class="description text-muted mt-4">
            {{ state.product.description }}
          </p>
          <div class="price">
            <p>{{ state.product.price }}</p>
          </div>
          <div class="action mt-4">
            <button class="btn btn-warning me-4">
              <font-awesome-icon icon="fa-solid fa-money-check-dollar " /><span
                class="ms-2"
                >Purchase</span
              >
            </button>
            <button
              class="btn btn-dark"
              @click="addToCart(state.product._id)"
              v-if="!state.successMessage && !state.alreadyExisted"
            >
              <font-awesome-icon icon="fa-solid fa-cart-plus " /><span
                class="ms-2"
                >Add to cart</span
              >
            </button>
            <button
              class="btn btn-success"
              v-else-if="state.successMessage"
              disabled
            >
              <font-awesome-icon icon="fa-solid fa-check-circle " /><span
                class="ms-2"
                >Added Successfully</span
              >
            </button>
            <button class="btn btn-danger" v-if="state.alreadyExisted" disabled>
              <font-awesome-icon icon="fa-solid fa-xmark-circle " /><span
                class="ms-2"
                >Already in the cart</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <NotFound v-else />
</template>

<script>
import { onMounted, reactive } from "vue";
import NotFound from "./NotFound.vue";
import axios from "axios";
export default {
  components: {
    NotFound,
  },
  props: {
    id: String,
  },
  setup(props) {
    const state = reactive({
      product: "",
      successMessage: false,
      alreadyExisted: false,
    });

    onMounted(async () => {
      try {
        let res = await axios.get(
          "http://localhost:3000/api/products/" + props.id
        );

        if (res.status == 200) {
          state.product = res.data.product;
        }
      } catch (err) {
        console.log("Error while getting product's details : ", err);
      }
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
    return { state, addToCart };
  },
};
</script>

<style lang="scss" scoped>
.p-view {
  margin-top: 100px;
  display: flex;
  gap: 50px;
  @media (max-width: 912px) {
    flex-direction: column;
    .img {
      text-align: center;
      width: 100%;
      img {
        width: 500px;
      }
    }
  }
  .right {
    .price {
      font-weight: 700;
      font-size: 1.2rem;
    }
  }
}
</style>
