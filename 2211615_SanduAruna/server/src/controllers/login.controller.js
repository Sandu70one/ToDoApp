import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { jwt_token, statusCode } from "../utils/constants.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { username, password } = req.body;
    const user = await User.findOne({
      username: username,
    });
    if (!user) {
      res.send(
        jsonGenerate(
          statusCode.UNPROCESSABLE_ENTITY,
          "username or password incorrect"
        )
      );
    }

    const verified = bcrypt.compareSync(password, user.password);
    if (!verified) {
      return res.json(
        jsonGenerate(
          statusCode.UNPROCESSABLE_ENTITY,
          "user or password incorrect"
        )
      );
    }

    const token = jwt.sign({ userId: user._id }, jwt_token);
    return res.json(
      jsonGenerate(statusCode.SUCCESS, "Login successful", {
        userId: user._id,
        token: token,
      })
    );
  }
  res.json(
    jsonGenerate(
      statusCode.VALIDATION_ERROR,
      "validation error",
      errors.mapped()
    )
  );
};
export default Login;
