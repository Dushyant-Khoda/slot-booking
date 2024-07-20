class ErrorHandler extends Error {
  constructor(msg, status = 500) {
    super();
    this.status = status;
    this.message = msg;
  }

  static alreadyExist(message) {
    console.log(message);
    return new ErrorHandler(message, 409);
  }

  static notFoundError(message) {
    console.log(message);
    return new ErrorHandler(message, 404);
  }

  static unauthorizedError(message) {
    console.log(message);
    return new ErrorHandler(message, 401);
  }

  static badRequestError(message) {
    console.log(message);
    return new ErrorHandler(message, 400);
  }

  static wrongCredentials() {
    return new ErrorHandler("Invalid credentials", 401);
  }
}

export default ErrorHandler;
