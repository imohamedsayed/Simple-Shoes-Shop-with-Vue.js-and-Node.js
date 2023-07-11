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

const products_get = async (req, res) => {
  try {
    const products = [];
    await db
      .collection("products")
      .find()
      .forEach((product) => {
        products.push(product);
      });
    res.status(200).json({ products });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const product_get = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    try {
      const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(req.params.id) });

      if (product) {
        res.status(200).json({ product });
      } else {
        res.status(404).json({ message: "This product does not exist." });
      }
    } catch (err) {
      res.status(400).json({ err, message: "Could not fetch product details" });
    }
  } else {
    res.status(400).json({ message: "Id is not valid" });
  }
};

/*
  CREATE 
*/

const product_post = async (req, res) => {
  try {
    const product = await db.collection("products").insertOne(req.body);
    res.status(201).json({ product, message: "Product added successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ errors: err, message: "Could not create this item" });
  }
};

/*
  DELETE 
*/
const product_delete = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    try {
      const product = await db.collection("products").deleteOne({
        _id: new ObjectId(req.params.id),
      });
      if (product.deletedCount) {
        res
          .status(200)
          .json({ product, message: "Product deleted successfully" });
      } else {
        res.status(404).json({ message: "Product does not exist" });
      }
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .json({ errors: err, message: "Could not delete this item" });
    }
  } else {
    res.status(400).json({ message: "not a valid ID" });
  }
};

module.exports = {
  products_get,
  product_get,
  product_post,
  product_delete,
};
