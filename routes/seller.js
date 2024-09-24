const { Router } = require("express");

const { sellerAuthMiddleware } = require("../middlewares/auth.middleware");
const { signInSchema, signUpSchema } = require("../schemas/zodSchemas");
const { SellerModel } = require("../schemas/sellerSchema");

const sellerRouter = Router();

sellerRouter.post("/signup", async function (req, res) {
  const { success, data } = signUpSchema.safeParse(req.body);

  if (!success) {
    res.status(500).json({
      message:
        "Invalid Format. Make sure to provide valid: firstname, lastname, email and password",
    });

    return;
  }

  const existingUser = await SellerModel.findOne({
    email: data.email,
  });

  if (existingUser) {
    res.status(403).send({
      message: "This email is already used. Please login.",
    });

    return;
  }

  const hashedPassword = await bcrypt.hash(data.password, 5);
  await SellerModel.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
  });

  res.json({
    message: "Signed up successfully.",
  });
});

sellerRouter.post("/signin", async function (req, res) {
  const { success, data } = signInSchema.safeParse(req.body);

  if (!success) {
    res.status(500).json({
      message: "Invalid Format. Make sure to provide valid email and password",
    });

    return;
  }

  const user = await SellerModel.findOne({
    email: data.email,
  });

  if (!user) {
    res.status(404).json({
      message: "Email doesn't exist",
    });

    return;
  }

  const isValidated = await bcrypt.compare(data.password, user.password);

  if (!isValidated) {
    res.status(403).json({
      message: "Invalid credentials",
    });

    return;
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SELLER_SECRET
  );

  res.json({
    message: "Signed in successfully",
    token,
  });
});

sellerRouter.post("/course", sellerAuthMiddleware, function (req, res) {});

module.exports = { sellerRouter };
