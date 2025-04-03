const sequelize = require("./connection");
const User = require("../models/usersModel");
const TendorInfo = require("../models/tendorinfoModel");
const Blog = require("../models/blogModel");
// const Mahadbtprofiles = require("../models/mahadbtModel");


User.sync({
  alter: false,
});

TendorInfo.sync({
  alter: false,
});



Blog.sync({
  alter: false,
});



// Mahadbtprofiles.sync({
//   alter: false,
// });

// ExcelInfo.sync({
//   alter: false,
// });

// dummyModel.sync({
//   alter: false,
// });



module.exports = {
  sequelize,
  User,
  TendorInfo
//   collegeprofile,
//   dummyModel,
//   courseData,
//   streamData,
//   QualificationLevel,
};
