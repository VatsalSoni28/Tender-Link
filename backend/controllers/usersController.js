const { Op } = require("sequelize");
const ROLES = require("../helpers/roles");
const User = require("../models/usersModel");
const { validationResult } = require("express-validator");
const { createHmac } = require("crypto");

const dotenv = require("dotenv");
dotenv.config();

exports.getAllUsers = (req, res) => {
  User.findAll({
    attributes: [
      "id",
      "username",
      "email",
      "mobile",
      "password",
      "role",
      "ref_code",
      "createdAt",
      "updatedAt",
    ],
  })
    .then((data) => {
      data = JSON.stringify(data);
      data = JSON.parse(data);
      res.json({
        success: true,
        data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to retrieve users",
        error: error,
      });
    });
};

// done
exports.getUserProfile = (req, res) => {
  const data = req.profile;
  return res.json({
    success: true,
    data,
  });
};

// done
exports.getUser = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    User.findOne({
      attributes: [
        "id",
        "username",
        "email",
        "mobile",
        "password",
        "role",
        "ref_code",
        "createdAt",
        "updatedAt",
      ],
      where: {
        id: req.body.id,
      },
    })
      .then((data) => {
        if (data) {
          data = JSON.stringify(data);
          data = JSON.parse(data);

          res.status(200).json({
            success: true,
            data,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: "Failed to get users",
          error: error,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
      error: error,
    });
  }
};

// done
exports.addUser = (req, res) => {
  try {
    const { username, email, mobile, role, ref_code } = req.body;

    // console.log(name, email, mobile, role, ref_code, password);

    const hashPassword = pass_encryptor(
      req.body.password,
      process.env.HASH_SECRET_KEY
    );

    // console.log(name, email, mobile, role, ref_code, hashPassword);
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

// done
exports.deleteUser = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    User.destroy({
      where: {
        id: req.body.id,
      },
    })
      .then((data) => {
        if (data) {
          return res.status(200).json({
            success: true,
            message: "User deleted successfully",
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: "Failed to delete user",
          error: error,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
      error: error,
    });
  }
};

// not tested
exports.deleteUsers = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg,
      });
    }

    User.destroy({
      where: {
        id: {
          [Op.in]: req.body.Ids,
        },
      },
    })
      .then((data) => {
        if (data) {
          return res.status(200).json({
            success: true,
            message: "Users deleted successfully",
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Users not found",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: "Failed to delete users",
          error: error,
        });
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing the request",
      error: error,
    });
  }
};


const pass_encryptor = (plainPassword, salt) => {
  return createHmac("sha256", salt).update(plainPassword).digest("hex");
};
