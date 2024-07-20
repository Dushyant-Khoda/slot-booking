import moment from "moment";
import { ErrorHandler } from "../Utils";

const ErrorMiddleware = (err, req, res, next) => {
  let statusCode = 500;
  let errData = {
    success: false,
    message: err.message,
    data: [],
    timestamp: moment().format("LLL"),
  };

  if (err instanceof ErrorHandler) {
    console.log(err.stack);
    statusCode = 422;
    errData = {
      success: false,
      message: err.message,
      data: [],
      timestamp: moment().format("LLL"),
    };
  }

  return res.status(statusCode).send(errData);
};

export default ErrorMiddleware;
