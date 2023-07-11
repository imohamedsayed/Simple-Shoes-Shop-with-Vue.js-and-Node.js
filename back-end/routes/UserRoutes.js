const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

/*
    GET
*/

router.get("/:userId/cart", UserController.get_cart_items);

/*
    POST
*/

router.post("/:userId/cart", UserController.add_cart_item);


/*
    Delete
*/

router.delete("/:userId/cart/:id", UserController.product_remove);


module.exports = router;
