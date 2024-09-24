const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { signUpSchema, signInSchema } = require("../schemas/zodSchemas");
const { UserModel } = require("../schemas/userSchema");

const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
  const { success, data } = signUpSchema.safeParse(req.body);

  if (!success) {
    res.status(500).json({
      message:
        "Invalid Format. Make sure to provide valid: firstname, lastname, email and password",
    });

    return;
  }

  const existingUser = await UserModel.findOne({
    email: data.email,
  });

  if (existingUser) {
    res.status(403).send({
      message: "This email is already used. Please login.",
    });

    return;
  }

  const hashedPassword = await bcrypt.hash(data.password, 5);
  await UserModel.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: hashedPassword,
  });

  res.json({
    message: "Signed up successfully.",
  });
});

userRouter.post("/signin", async function (req, res) {
  const { success, data } = signInSchema.safeParse(req.body);

  if (!success) {
    res.status(500).json({
      message: "Invalid Format. Make sure to provide valid email and password",
    });

    return;
  }

  const user = await UserModel.findOne({
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
    process.env.JWT_SECRET
  );

  res.json({
    message: "Signed in successfully",
    token,
  });
});

userRouter.post("/purchases", function (req, res) {});

module.exports = { userRouter };
