const ErrorHandler = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource Not Found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Mongoose Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong JWT Error
  if (err.name === "jsonWebTokenError") {
    const message = `Json Web Token is Invalid, Try Again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT Expire Error
  if (err.name === "TokenExpireError") {
    const message = `Json Web Token is Expired, Try Again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
