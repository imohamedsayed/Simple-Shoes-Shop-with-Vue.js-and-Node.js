<template>
  <div class="container">
    <div class="cart-view mt-5">
      <h2>
        <font-awesome-icon icon="fa-solid fa-cart-shopping " /><span
          class="ms-2"
          >cart</span
        >
      </h2>
      <hr />
      <div class="cart-content" v-if="state.products.length">
        <div class="cart-items">
          <ProductCart
            v-for="product in state.products"
            :key="product.id"
            :product="product"
            @remove="removeItem"
          />
        </div>
        <div class="cart-total">
          <div class="total-info">
            <p class="item">Original : {{ total }} LE</p>
            <p class="item">Taxes : 0 LE</p>
            <p class="item">Shipping : 0 LE</p>
            <p class="Total">Total : {{ total }} LE</p>

            <button class="btn btn-success w-100 mt-4">Confirm Order</button>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <img src="../assets/cart.jpg" style="width: 500px" alt="" />
        <p class="alert alert-info text-center">Your cart is empty</p>
      </div>
    </div>
  </div>
</template>

<script language="javascript">
import ProductCart from "@/components/ProductCart.vue";
import { reactive, computed, onMounted } from "vue";
import axios from "axios";
export default {
  components: { ProductCart },
  setup() {
    const state = reactive({
      products: "",
    });

    const removeItem = async (id) => {
      // remove it from the DOM
      state.products = state.products.filter((item) => item._id != id);

      // delete it from db

      try {
        await axios.delete(
          "http://localhost:3000/api/user/64ac6b2636123aefb53a3d0d/cart/" + id
        );
      } catch (err) {
        console.log("Error while removing item from cart : ", err);
      }
    };

    onMounted(async () => {
      let res = await axios.get(
        "http://localhost:3000/api/user/64ac6b2636123aefb53a3d0d/cart/"
      );
      state.products = res.data.cart;
    });

    let total = computed(() =>
      state.products.reduce((sum, { price }) => sum + +price, 0)
    );

    return { state, removeItem, total };
  },
};
</script>

<style lang="scss" scoped>
.cart-view {
  .cart-content {
    display: flex;
    gap: 5%;
    @media (max-width: 904px) {
      flex-direction: column;
    }
    .cart-items {
      flex: 0 0 60%;
      max-width: 60%;

      @media (max-width: 904px) {
        flex: 0 0 1;
        max-width: 100%;
      }
    }
    .cart-total {
      flex: 0 0 35%;
      max-width: 35%;
      @media (max-width: 904px) {
        flex: 0 0 1;
        max-width: 100%;
      }
      .total-info {
        background: #0096881c;
        padding: 20px;
        border-radius: 10px;
        p {
          &.item {
            font-size: 1.4rem;
            position: relative;
            padding-bottom: 15px;
            &:after {
              content: "";
              width: 100%;
              height: 1px;
              background: #8f8f8ffd;
              position: absolute;
              bottom: 0;
              left: 0;
            }
          }
          &.Total {
            font-size: 2rem;
            text-align: center;
            margin-top: 30px;
          }
        }
      }
    }
  }
}
</style>
