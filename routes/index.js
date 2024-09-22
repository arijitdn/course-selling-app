const { Router } = require("express");

const { userRouter } = require("./user");
const { courseRouter } = require("./course");
const { sellerRouter } = require("./seller");

const router = Router();

router.use("/user", userRouter);
router.use("/course", courseRouter);
router.use("/seller", sellerRouter);

module.exports = router;
