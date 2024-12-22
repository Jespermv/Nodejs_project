// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err.stack);

  // Default error response
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Send the error response
  res.status(status).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;
