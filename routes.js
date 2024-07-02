const { Router } = require("express");
const { verify } = require("jsonwebtoken");
const { createUser, login } = require("./controller/usercontroller");
const router = Router();

router.post("/api/login", login);
router.post("/api/signup", createUser);

module.exports = {router};
// what is wrong