const express = require("express");
const app = express();
const { connectToDB } = require("./db");
const cors = require("cors");

app.use(express.json());
app.use(cors());

connectToDB((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("App is now listening");
    });
  } else {
    console.log("Error while DB connecting: ", err);
  }
});

app.use("/api/products", require("./routes/ProductRoutes"));
app.use("/api/user", require("./routes/UserRoutes"));

// tell server how to serve images

const path = require("path");

app.use("/images", express.static(path.join(__dirname, "./images")));

app.use((req, res) => {
  res.status(404).json({ message: "not found" });
});
