const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB || "car_rental",
  process.env.usernameDB || "root",
  process.env.passDB || "DATABASE_PASSWORD",
  {
    host: process.env.DBhost || "DATABASE_HOST",
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const User = sequelize.define("User", {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  UserName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("User created successfully!");
  })
  .catch((error) => {
    console.error(
      "Unable to create user : ",
      process.env.production ? "" : error
    );
  });

module.exports = { User };
