const { Schema, model } = require("mongoose");

const sellerSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  firstName: String,
  lastName: String,
});

const SellerModel = model("seller", sellerSchema);
module.exports = { SellerModel };
