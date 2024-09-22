const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: {
    type: Schema.ObjectId,
  },
});

const CourseModel = model("course", courseSchema);
module.exports = { CourseModel };
