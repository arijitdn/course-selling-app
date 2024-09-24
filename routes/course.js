const { Router } = require("express");

const { authMiddleware } = require("../middlewares/auth.middleware");
const { CourseModel } = require("../schemas/courseSchema");
const { PurchaseModel } = require("../schemas/purchaseSchema");

const courseRouter = Router();

courseRouter.post("/purchase", authMiddleware, async function (req, res) {
  const userId = req.userId;
  const { courseId } = req.body;
  if (!courseId) {
    res.json({
      message: "Please provide a valid course id",
    });

    return;
  }

  const course = await CourseModel.findOne({
    _id: courseId,
  });

  if (!course) {
    res.json({
      message: "Invalid course",
    });

    return;
  }

  // TODO: Add payments
  const purchaseData = await PurchaseModel.create({
    userId,
    courseId,
  });

  res.json({
    message: "Successfully bought the course",
    courseId,
    transactionId: purchaseData._id,
  });
});
courseRouter.get("/preview", async function (req, res) {
  const courses = await CourseModel.find();

  res.json({
    courses,
  });
});

module.exports = { courseRouter };
