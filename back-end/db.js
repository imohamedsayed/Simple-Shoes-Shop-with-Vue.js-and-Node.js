const { MongoClient } = require("mongodb");
let DBConnection;
module.exports = {
  connectToDB: (cb) => {
    MongoClient.connect("mongodb://localhost:27017/footwear")
      .then((client) => {
        DBConnection = client.db();
        return cb();
      })
      .catch((err) => {
        // console.log("Error while DB connecting: ", err);
        return cb(err);
      });
  },
  getDB: () => DBConnection,
};
