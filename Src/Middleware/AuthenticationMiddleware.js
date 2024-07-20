import { UserModel } from "../Models";
import jwt from "jsonwebtoken";
import { ErrorHandler } from "../Utils";
import { JWT_SECRET } from "../../Config";

const AuthenticationMiddleware = async (req, res, next) => {
  try {
    let authToken = req.headers.authorization || req.cookies.token;

    if (!authToken) {
      // authToken = ;
      return next(
        new ErrorHandler("Please Login to access this resources", 401)
      );
    }
    let token = authToken;
    if (req.headers.authorization) {
      token = authToken.split(" ")[1];
    }
    if (token === "undefined") {
      return new ErrorHandler("Please Login to access this resources", 401);
    }
    const decodeData = jwt.verify(token, JWT_SECRET);

    req.user = await UserModel.findById(decodeData.id);

    next();
  } catch (error) {
    return next(new ErrorHandler(error, 401));
  }
};

export default AuthenticationMiddleware;
