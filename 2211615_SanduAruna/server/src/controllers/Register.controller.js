import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { jwt_token, statusCode } from "../utils/constants.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const Register = async (req, res) => {
  const errors = validationResult(req);
  // res.send(errors);

  if (errors.isEmpty()) {
    let { name, username, password, email } = req.body;

    const Salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, Salt);

    // password= hashPassword;

    const userExist = await User.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });

    if (userExist) {
      return res.json(
        jsonGenerate(
          statusCode.UNPROCESSABLE_ENTITY,
          "user or email alreday exist"
        )
      );
    }
    //save to db
    try {
      const result = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        username: username,
      });

      const token = jwt.sign({ userId: result._id }, jwt_token);

      res.json(
        jsonGenerate(statusCode.SUCCESS, "Registration successfuly", {
          userId: result._id,
          token: token,
        })
      );
    } catch (error) {
      console.log(error);

       res.json(
        jsonGenerate(
        statusCode.VALIDATION_ERROR,
        "validation error",
        errors.mapped()
        )
      );
    }
  }
 
};

export default Register;
