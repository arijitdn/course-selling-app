const { z } = require("zod");

const signUpSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const courseSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
  price: z.number(),
});

module.exports = { signUpSchema, signInSchema, courseSchema };
