import { check } from "express-validator";

// cheking values and if they are not valied send messages
export const RegisterSchema = [

  check("name")
    .trim()
    .isAlpha()
    .withMessage("Name must be alphabetic"),

  check("username", "username is required")
    .exists()
    .isAlphanumeric()
    .withMessage("username must be alphanumeric")
    .trim()
    .isLength({ min: 6, max: 32 }),

  check("password", "password is required")
    .isLength({ min: 6, max: 32 })
    .exists()
    .trim(),

  check("email", "email is required")
    .exists()
    .isEmail(),

];
