const express = require("express");



const {
  signUpValidationSchema,
  signInValidationSchema,
  getUserValidationSchema,
  addUserValidationSchema,
  updateUserValidationSchema,
  deleteUserValidationSchema,
  changePasswordValidationSchema,
  UsersValidationSchemaForIds,
} = require("../helpers/validation");

const { signup, signin } = require("../controllers/authController");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));



router.post("/signup", signUpValidationSchema, signup);

router.post("/signin", signInValidationSchema, signin);



module.exports = router;
