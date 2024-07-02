const dotenv = require("dotenv");
const sequelize = require("sequelize");
dotenv.config();

function createUser(req, res) {
  if (!req.body.username || !req.body.password)
    return res.send("fill all details");

  sequelize
    .sync()
    .then(() => {
      console.log("Book table created successfully!");

      Book.create({
        title: "Clean Code",
        author: "Robert Cecil Martin",
        release_date: "2021-12-14",
        subject: 3,
      })
        .then((res) => {
          let data = {
            uid: res["dataValues"]["id"],
          };
          return res
            .status(200)
            .send({
              message: "Account created succesfully",
              user_id: res["dataValues"]["id"],
            });
        })
        .catch((error) => {
          console.error(
            process.env.production
              ? "internal error occured"
              : `Failed to create a new record : ${error}`
          );
        });
    })
    .catch((error) => {
      console.error(
        process.env.production
          ? "internal error occured"
          : `Failed to create a new record : ${error}`
      );
    });

  res.send(token);
}

module.exports = { createUser };