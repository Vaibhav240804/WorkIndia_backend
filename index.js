const express = require("express");
const dotenv = require("dotenv");
const { router } = require("./routes");
dotenv.config();

const cors = require("cors");
const { connectDB } = require("./server");
const app = express();

connectDB();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
