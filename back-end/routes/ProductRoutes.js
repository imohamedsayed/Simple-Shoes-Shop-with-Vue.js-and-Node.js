const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

/*
    GET
*/
router.get("/", ProductController.products_get);
router.get("/:id", ProductController.product_get);

/*
    POST
*/
router.post("/", ProductController.product_post);

/*
    DELETE
*/

router.delete("/:id", ProductController.product_delete);

module.exports = router;
