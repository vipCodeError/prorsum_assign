const mongoose = require("mongoose");
require("../mongo");

const UserSchema = new mongoose.Schema(
  {
    name:             { type: String, trim: true, index: true, required: true },
    lastName:         { type: String, trim: true, index: true, required: true },
    profileImg:       { type: String, trim: true, required: false },
    email:            { type: String, trim: true, index: true },
    phone:            { type: String, index: true },
    password:         { type: String, required: true}
  },
  {
    timestamps: true,
  }
);


var UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
