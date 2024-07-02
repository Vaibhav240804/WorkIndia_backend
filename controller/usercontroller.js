const dotenv = require("dotenv");
const { User } = require("../models/usermodel");
dotenv.config();

var createUser = (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) return res.send("fill all details");

  User.findOne({ where: { UserName: username } }).then((user) => {
    if (user) {
      return res.status(400).send("User already exists");
    }
  });

  let user;
  User.sync()
    .then(() => {
      console.log("called successfully!");

      User.create({
        Name: username,
        UserName: username,
        Password: password,
      })
        .then((res) => {
          user = res;
          return user;
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
    console.log(user);
  return user
    ? res.status(400).send({
        message: "Account created succesfully",
        user_id: user["dataValues"]["id"],
      })
    : res.send("internal error occured");
};

module.exports = { createUser };

/*
{ username: 'user5', password: 'pass' }
user5 pass
Executing (default): SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME = 'Users' AND TABLE_SCHEMA = 'car_rental'
Executing (default): SELECT `id`, `Name`, `UserName`, `Password`, `createdAt`, `updatedAt` FROM `Users` AS `User` WHERE `User`.`UserName` = 'user5' LIMIT 1;
Executing (default): SHOW INDEX FROM `Users`
node:_http_outgoing:652
    throw new ERR_HTTP_HEADERS_SENT('set');
          ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (node:_http_outgoing:652:11)
    at ServerResponse.header (D:\COLLEGE\Placement Season\WORK INDIA OA\car_rental_backend\node_modules\express\lib\response.js:795:10)
    at ServerResponse.send (D:\COLLEGE\Placement Season\WORK INDIA OA\car_rental_backend\node_modules\express\lib\response.js:175:12)
    at D:\COLLEGE\Placement Season\WORK INDIA OA\car_rental_backend\controller\usercontroller.js:12:30
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
  code: 'ERR_HTTP_HEADERS_SENT'
}

Node.js v20.11.0
how to solve it-> 
*/
