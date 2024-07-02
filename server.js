const dotenv = require("dotenv");
dotenv.config();

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB || "car_rental",
  process.env.usernameDB || "root",
  process.env.passDB || "DATABASE_PASSWORD",
  {
    host: process.env.DBhost || "DATABASE_HOST",
    dialect: "mysql",
  }
);

function connectDB() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });
}

module.exports = {connectDB};
