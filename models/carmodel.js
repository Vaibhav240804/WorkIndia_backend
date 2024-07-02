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

const Car = sequelize.define("Car", {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number_plate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rent_per_hr: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  current_city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rent_history: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("entry successfully!");
  })
  .catch((error) => {
    console.error(
      "Unable to enter car details : ",
      process.env.production ? "" : error
    );
  });

