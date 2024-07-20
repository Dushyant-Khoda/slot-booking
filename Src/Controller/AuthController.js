import { UserModel } from "../Models";
import { ErrorHandler, SuccessHandler } from "../Utils";
import bcrypt from "bcryptjs";

const AuthController = {
  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const isUserExist = await UserModel.findOne({
        email: email,
        is_active: true,
      }).select("+password");
      if (!isUserExist) {
        return next(ErrorHandler.notFoundError("User not found"));
      }

      const doMatchPassword = await isUserExist.comparePassword(password);
      if (!doMatchPassword) {
        next(ErrorHandler.authenticationError("Invalid credentials"));
      }

      // const userInfo = {isUserExist:}
      const doGenerateToken = await isUserExist.generateToken();
      SuccessHandler(
        res,
        { user_info: isUserExist, access_token: doGenerateToken },
        200,
        "User logged in successfully"
      );
    } catch (error) {
      next(new ErrorHandler(error, 500));
    }
  },
  async registerUser(req, res, next) {
    try {
      const isUserExist = await UserModel.findOne({
        email: req.body.email,
        is_active: true,
      });
      if (isUserExist) {
        next(ErrorHandler.alreadyExist("User already exists"));
      } else {
        const { fullname, email, password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const doAddUserWorker = await UserModel.create({
          fullname,
          email,
          password: encryptedPassword,
          role: "user",
        });
        SuccessHandler(res, doAddUserWorker, 201, "User created successfully");
      }
    } catch (error) {
      next(new ErrorHandler(error, 500));
    }
  },
};

export default AuthController;
