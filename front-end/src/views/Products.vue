<template>
  <div class="products pt-5">
    <div class="container">
      <h2 class="title">Products</h2>
      <hr />
      <div class="row justify-content-center" v-if="state.products.length">
        <div
          class="col-lg-3 col-md-6 col-12 mb-4"
          v-for="product in state.products"
          :key="product.id"
        >
          <Product :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import axios from "axios";
import { reactive, onMounted } from "vue";
export default {
  name: "products",
  components: { Product },
  setup() {
    const state = reactive({
      products: [],
    });
    onMounted(async () => {

      let res = await axios.get("http://localhost:3000/api/products");
      state.products = res.data.products;
    });

    return { state };
  }, // End Setup,
};
</script>
<style lang="scss" scoped></style>
