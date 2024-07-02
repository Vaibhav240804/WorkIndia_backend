const dotenv = require("dotenv");
const { User } = require("../models/usermodel");
dotenv.config();

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    console.log(username, password);

    if (!username || !password) {
      return res.send("fill all details");
    }

    const existingUser = await User.findOne({ where: { UserName: username } });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    await User.sync();
    console.log("called successfully!");

    const newUser = await User.create({
      Name: username,
      UserName: username,
      Password: password,
    });

    return res.status(200).send({
      message: "Account created successfully",
      user_id: newUser.dataValues.id,
    });
  } catch (error) {
    return res.send(
      process.env.production
        ? "internal error occurred"
        : `Failed to create a new record : ${error}`
    );
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    console.log(username, password);

    if (!username || !password) {
      return res.send("fill all details");
    }
    const existing = await User.findOne({
      where: { UserName: username, Password: password },
    });
    if (!existing) {
      return res.status(400).send("Invalid credentials");
    }

    const jwtSecretKey = process.env.jwtSecret;


  } catch (error) {
    return res.send(
      process.env.production
        ? "internal error occurred"
        : `Failed to create a new record : ${error}`
    );
  }
};

module.exports = { createUser };
