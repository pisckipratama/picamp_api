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

  res.status(error.statusCode || 500).json({
    success: false, message: error.message || "Server error.",
    data: null
  });
};

module.exports = errorHandler;