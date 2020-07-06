const ErrorHandler = require('../helpers/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // log to console for dev
  console.error(err.stack.red);

  // mongoose bad objectid
  if (err.name === "CastError") {
    const message = `Resource not found with Objectid of ${err.value}`;
    error = new ErrorHandler(message, 404);
  }

  // mongoose duplicate object
  if (err.code === 11000) {
    const message = `Duplicate field value entered.`;
    error = new ErrorHandler(message, 400);
  }

  // mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorHandler(message, 400);
  }
  
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server error."
  });
};

module.exports = errorHandler;