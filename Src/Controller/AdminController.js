import { ServicesModel, UserModel } from "../Models";
import { ErrorHandler, SuccessHandler } from "../Utils";
import bcrypt from "bcryptjs";

const AdminController = {
  async doUpdateServiceStatus(req, res, next) {
    try {
      const { id } = req.params;
      const isExist = await ServicesModel.findById(id);
      if (!isExist) {
        return next(ErrorHandler.notFoundError("Service not found"));
      }

      const updatedService = await ServicesModel.findByIdAndUpdate(
        id,
        { is_active: req.body.status },
        { new: true }
      );
      SuccessHandler(
        res,
        updatedService,
        200,
        "Service status updated successfully"
      );
    } catch (error) {
      next(ErrorHandler.badRequestError(error));
    }
  },
  async doUpdateUserStatus(req, res, next) {
    try {
      const { id } = req.params;
      const isExist = await UserModel.findById(id);
      if (!isExist) {
        return next(ErrorHandler.notFoundError("User not found"));
      }
      const doUpdateUserStatus = await UserModel.findByIdAndUpdate(
        id,
        {
          is_active: req.body.status ? req.body.status : isExist.is_active,
          role: req.body.role ? req.body.role : isExist.role,
        },
        { new: true }
      );
      SuccessHandler(
        res,
        doUpdateUserStatus,
        200,
        "User status updated successfully"
      );
    } catch (error) {
      next(ErrorHandler.badRequestError(error));
    }
  },
  async doAddUser(req, res, next) {
    try {
      const isUserExist = await UserModel.findOne({
        email: req.body.email,
        is_active: true,
      });
      if (isUserExist) {
        next(ErrorHandler.alreadyExist("User already exists"));
      } else {
        const { fullname, email, password, role } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const doAddUserWorker = await UserModel.create({
          fullname,
          email,
          password: encryptedPassword,
          role,
        });
        SuccessHandler(res, doAddUserWorker, 201, "User created successfully");
      }
    } catch (error) {
      next(new ErrorHandler(error, 500));
    }
  },
};
export default AdminController;
