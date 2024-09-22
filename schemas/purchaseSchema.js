const { Schema, model } = require("mongoose");

const purchaseSchema = new Schema({
  courseId: {
    type: Schema.ObjectId,
  },
  userId: {
    type: Schema.ObjectId,
  },
});

const PurchaseModel = model("purchase", purchaseSchema);
module.exports = { PurchaseModel };
