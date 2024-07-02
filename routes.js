const { Router } = require("express");
const { verify } = require("jsonwebtoken");
const { createUser } = require("./controller/usercontroller");
const router = Router();

router.post("api/login", verify, createUser);
router.post("api/signup", createUser);

module.exports = {router};
// what is wrong