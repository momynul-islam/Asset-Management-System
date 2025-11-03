const sendErrorDev = (err, req, res) => {
  console.log(err);
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Programming or other unknown error: don't leak error details
  console.error("ERROR 💥", err);
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Something went wrong!";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  }

  if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, req, res);
  }
};
