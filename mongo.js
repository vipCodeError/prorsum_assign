const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

require("dotenv").config();

const { MONGO_URL, MONGO_USERNAME, MONGO_PASSWORD } = process.env;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,}
);

const conSuccess = mongoose.connection;
conSuccess.once("open", (_) => {
  console.log("Database connected:");
});

conSuccess.on("error", (err) => {
  console.error("connection error:", err);
});
