import moment from "moment";

const SuccessHandler = (res, payload, statusCode, message) => {
  debugger;
  return res.status(statusCode).json({
    success: true,
    message: message,
    data: payload,
    timestamp: moment().format("LLL"),
  });
};
export default SuccessHandler;
