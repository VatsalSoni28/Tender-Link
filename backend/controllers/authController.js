const dotenv = require("dotenv");
const { check, body, validationResult, Result } = require("express-validator");
const jwt = require("jsonwebtoken");
const { createHmac } = require("crypto");
const speakeasy = require("speakeasy");

const User = require("../models/usersModel");
const ROLES = require("../helpers/roles");
// const Mahadbtprofiles = require("../models/mahadbtModel");
dotenv.config();


exports.signup = (req, res) => {
  console.log("Hello World");
  const { username, email, mobile, role, ref_code } = req.body;
  // console.log(username, email, mobile, role, ref_code);
  // console.log();
  try {
    const { username, email, mobile, role, ref_code } = req.body;
    // console.log(username, email, mobile, role, ref_code);
    const hashPassword = pass_encryptor(
      req.body.password,
      process.env.HASH_SECRET_KEY
    );
    // console.log(username, email, mobile, role, ref_code, hashPassword);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }
    User.create({
      username,
      email,
      mobile,
      role,
      ref_code,
      password: hashPassword,
    })
      .then((data) => {
        return res.status(200).json({
          message: "SignUp successfull",
          success: true,
          data: {
            id: data.id,
            username: data.username,
          },
        });
      })
      .catch((error) => {
        error.errors[0].instance = undefined;
        if (error.errors[0].type == "unique violation") {
          // 409 Conflict status code to indicate a conflict with the current state of the resource due to a unique constraint violation.
          return res.status(409).json({
            success: false,
            error: error.errors[0],
            message: "user already exists",
          });
        } else {
          return res.status(400).json({
            success: false,
            error: error.errors[0],
            message: "something went wrong while signup!",
          });
        }
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
      message: "something went wrong!",
    });
  }
};

exports.signin = (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username, password);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    User.findOne({ where: { username } })
      .then((data) => {
        data = data.toJSON();

        const hashPassword = pass_encryptor(
          password,
          process.env.HASH_SECRET_KEY
        );
        if (hashPassword === data.password) {
          const accessToken = jwt.sign(
            {
              id: data.id,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "2h",
            }
          );
          data.password = undefined;
          return res.json({
            accessToken: accessToken,
            success: true,
            user: data,
          });
        } else {
          return res.status(401).json({
            status: false,
            message: "Invalid Password",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          status: false,
          message: "Invalid Details",
          error: error,
        });
      });
  } catch (error) {
    // 500 This communicates that there was an unexpected error on the server side.
    return res.status(500).json({
      success: false,
      error,
      message: "An error occurred while processing the request!",
    });
  }
};

exports.isSignedIn = (req, res, next) => {
  const headerAuth = req.headers["authorization"];
  if (!headerAuth) {
    return res.status(401).json({
      success: false,
      message: "Missing authentication token",
    });
  }
  jwt.verify(headerAuth, process.env.ACCESS_TOKEN_SECRET, function (err, data) {
    if (err) {
      // Handle the error
      return res.status(401).json({
        error: err.message,
        message: "Invalid or expired authentication token",
        success: false,
      });
    } else {
      const { id } = data;
      User.findOne({ where: { id } })
        .then((user) => {
          user = user.toJSON();
          user.password = undefined;
          req.profile = user;
          next();
        })
        .catch((error) => {
          return res.status(401).json({
            message: "User authentication failed",
            success: false,
            error,
          });
        });
    }
  });
};

// Function to verify a TOTP token
const verifyTOTPToken = (secret, token) => {
  // console.log("secret", secret.base32);
  return speakeasy.totp.verify({
    secret: secret.base32,
    encoding: "base32",
    token: token,
    // initial_time: 1, // specified in seconds
    initial_time: 1, // set the time step to 15 seconds
    window: 20, // set the allowable margin for token
  });
};

exports.verifyToken = (req, res, next) => {
  // console.log("reqDFDSFDSF", req.body);
  req.idData = req.body.email;

  const { secret, otp, email } = req.body;
  const isTokenValid = verifyTOTPToken(secret, otp);
  // console.log("isTokenValid", isTokenValid);

  if (isTokenValid) {
    Mahadbtprofiles.findOne({ where: { email } })
      .then((data) => {
        data = data.toJSON();
        // console.log("dataaaaDJFDSK", data);
        // user.password = undefined;
        // main = {
        //   emailID: email,
        // };
        // console.log("main", main);
        // req.idData = main;
        next();
      })
      .catch((error) => {
        console.log("errroror", error);
      });
    // res.status(200).send("OTP is valid");
  } else {
    return res.status(401).json({
      message: "User authentication failed",
      success: false,
    });
    // res.status(400).send("OTP is invalid");
  }
};

exports.isAdmin = (req, res, next) => {
  const { role } = req.profile;
  if (role == ROLES.ADMIN) {
    next();
  } else {
    return res.status(403).json({
      status: false,
      message: "Forbidden!",
    });
  }
};

exports.isStudent = (req, res, next) => {
  const { role } = req.profile;
  if (role == ROLES.STUDENT) {
    next();
  } else {
    return res.status(403).json({
      status: false,
      message: "Forbidden!",
    });
  }
};

const pass_encryptor = (plainPassword, salt) => {
  return createHmac("sha256", salt).update(plainPassword).digest("hex");
};
