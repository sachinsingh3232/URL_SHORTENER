const mongoose = require('mongoose');

const connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_URI).then((res) => {
    console.log("connected");
  }).catch((e) => {
    console.log("not connected");
  })
}
module.exports = connectDB;