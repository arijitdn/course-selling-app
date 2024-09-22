const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const apiRouter = require("./routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1", apiRouter);

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
  app.listen(PORT, function () {
    console.log(`Server running on port: ${PORT}`);
  });
}

main();
