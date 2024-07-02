const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const { connectDB } = require("./server");
const app = express();

connectDB();

app.use(cors());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  return res.send("HELLO");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
  console.log(`Listening on port ${PORT}`);
});
