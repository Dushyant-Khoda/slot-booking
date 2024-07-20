import { ServicesModel, SlotModel, UserModel } from "../Models";
import { ErrorHandler, SuccessHandler } from "../Utils";
import bcrypt from "bcryptjs";

const UserController = {
  async doBookSlot(req, res, next) {
    try {
      const { serviceId, slotId } = req.body;

      const service = await ServicesModel.findById(serviceId);
      if (!service) {
        return next(ErrorHandler.notFoundError("Service not found"));
      }

      const slot = await SlotModel.findOne({
        _id: slotId,
        service_id: serviceId,
      });
      if (!slot) {
        return next(ErrorHandler.notFoundError("Slot not found"));
      }

      if (slot.is_booked) {
        return next(new ErrorHandler("Slot Already Booked", 400));
      }

      slot.booked_by = req.user._id;
      slot.is_booked = true;
      await slot.save();
      const user = await UserModel.findByIdAndUpdate(
        req.user._id,
        { $push: { slot: req.body } },
        { new: true }
      );
      SuccessHandler(res, user, 200, "Slot booked successfully");
    } catch (err) {
      next(ErrorHandler.badRequestError(err));
    }
  },
};

export default UserController;
