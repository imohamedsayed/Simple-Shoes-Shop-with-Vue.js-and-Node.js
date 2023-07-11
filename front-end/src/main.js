import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "normalize.css";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faUserSecret,
  faHome,
  faCartShopping,
  faShoePrints,
  faStar,
  faEye,
  faTrash,
  faCartPlus,
  faMoneyCheckDollar,
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

import { faShopify } from "@fortawesome/free-brands-svg-icons";

import {
  faStarHalfStroke,
  faStar as regStar,
} from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(
  faUserSecret,
  faHome,
  faCartShopping,
  faShopify,
  faShoePrints,
  faStar,
  faTrash,
  faStarHalfStroke,
  regStar,
  faEye,
  faCartPlus,
  faXmarkCircle,
  faCheckCircle,

  faMoneyCheckDollar
);

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
