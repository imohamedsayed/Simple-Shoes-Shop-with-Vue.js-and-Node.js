const { connectToDB, getDB } = require("../db");
const { ObjectId } = require("mongodb");

let db;
connectToDB((err) => {
  if (!err) {
    db = getDB();
  } else {
    console.log("Error while DB connecting: ", err);
  }
});

const get_cart_items = async (req, res) => {
  const userID = req.params.userId;
  try {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userID) });

    if (user) {
      const products = await db.collection("products").find().toArray();
      const cartItemsIds = user.cart;
      const cart = cartItemsIds.map((id) => products.find((p) => p._id == id));
      res.status(200).json({ cart });
    } else {
      res.status(404).json({ message: "user is not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err: err, message: "Something went wrong, Retry again later" });
  }
};
const add_cart_item = async (req, res) => {
  const userID = req.params.userId;
  try {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userID) });

    if (user) {
      if (user.cart.includes(req.body.product_id) && Array.isArray(user.cart))
        return res
          .status(400)
          .json({ message: "Product is already existed in the cart" });

      try {
        await db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(userID) },
            { $push: { cart: req.body.product_id } }
          );

        res.status(201).json({ message: "Product added to cart successfully" });
      } catch (err) {
        res.status(500).json({
          errors: err,
          message: "Something went wrong, Retry again later",
        });
      }
    } else {
      res.status(404).json({ message: "user is not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err: err, message: "Something went wrong, Retry again later" });
  }
};

/*
  Remove item from cart
*/

const product_remove = async (req, res) => {
  const userID = req.params.userId;
  try {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userID) });

    if (user) {
      if (!user.cart.includes(req.params.id))
        return res
          .status(400)
          .json({ message: "Product is not existed in the cart" });

      try {
        await db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(userID) },
            { $pull: { cart: req.params.id } }
          );

        res.status(200).json({
          message: "Product removed from the cart successfully",
        });
      } catch (err) {
        res.status(500).json({
          errors: err,
          message: "Something went wrong, Retry again later",
        });
      }
    } else {
      res.status(404).json({ message: "user is not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err: err, message: "Something went wrong, Retry again later" });
  }
};

module.exports = {
  get_cart_items,
  add_cart_item,
  product_remove,
};
