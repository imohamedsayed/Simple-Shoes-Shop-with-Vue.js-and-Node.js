import { createRouter, createWebHistory } from "vue-router";
import Products from "../views/Products.vue";
import Cart from "../views/Cart.vue";
import ProductDetails from "../views/ProductDetails.vue";
import NotFound from "../views/NotFound.vue";
const routes = [
  {
    path: "/products",
    name: "products",
    component: Products,
    meta: {
      title: "Products",
    },
  },
  {
    path: "/products/:id",
    name: "product_details",
    props: true,
    component: ProductDetails,
    meta: {
      title: "Product Details",
    },
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
    meta: {
      title: "Cart",
    },
  },
  {
    path: "/",
    name: "home",
    redirect: "/products",
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    meta: {
      title: "404 Not Found",
    },
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | E-Commerce`;
  next();
});

export default router;
