import moment from "moment";
import { ServicesModel, SlotModel } from "../Models";
import { ErrorHandler, SuccessHandler } from "../Utils";

const SubAdminController = {
  async doAddService(req, res, next) {
    const { title, description, amount, currency, slots, startDate, endDate } =
      req.body;
    const validDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const isValidDay = (day) => validDays.includes(day);

    if (slots.some((slot) => !isValidDay(slot.day))) {
      return next(ErrorHandler(res, "Invalid day provided in slots", 400));
    }
    const newService = new ServicesModel({
      title,
      description,
      amount,
      currency,
      user_id: req.user._id,
    });
    const savedService = await newService.save();
    const start = moment(startDate);
    const end = moment(endDate);

    let current = start.clone();
    const slotDocs = [];

    while (current.isSameOrBefore(end, "day")) {
      slots.forEach((slot) => {
        const slotStart = moment(current)
          .set("hour", slot.start)
          .set("minute", 0)
          .toDate();
        const slotEnd = moment(current)
          .set("hour", slot.end)
          .set("minute", 0)
          .toDate();
        slotDocs.push({
          service_id: savedService._id,
          user_id: req.user._id,
          date: current.toDate(),
          start: slotStart,
          end: slotEnd,
        });
      });
      current.add(1, "day");
    }

    const savedSlots = await SlotModel.insertMany(slotDocs);

    savedService.slot_id = savedSlots.map((slot) => slot._id);
    await savedService.save();
    SuccessHandler(res, savedService, 200, "Service added successfully");
  },

  async listServiceRecords(req, res, next) {
    const service = await ServicesModel.find()
      .populate("slot_id")
      .populate("user_id", "fullname");
    if (!service) {
      return next(ErrorHandler.notFoundError("Service not found"));
    }
    SuccessHandler(res, service, 200, "Service fetched successfully");
  },
  async getServiceDetails(req, res, next) {
    const { id } = req.params;
    try {
      const service = await ServicesModel.findOne({ _id: id })
        .populate("slot_id")
        .populate("user_id", "fullname");
      if (!service) {
        return next(ErrorHandler.notFoundError("Service not found"));
      }
      SuccessHandler(res, service, 200, "Service fetched successfully");
    } catch (err) {
      return next(ErrorHandler.badRequestError(err));
    }
  },
  async doEditServiceDetails(req, res, next) {
    const { id } = req.params;
    const { title, description, amount, currency, slots } = req.body;

    try {
      const service = await ServicesModel.findById(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      service.title = title || service.title;
      service.description = description || service.description;
      service.amount = amount || service.amount;
      service.currency = currency || service.currency;

      if (slots) {
        const validDays = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];
        const isValidDay = (day) => validDays.includes(day);
        if (slots.some((slot) => !isValidDay(slot.day))) {
          return next(ErrorHandler(res, "Invalid day provided in slots", 400));
        } else {
          await SlotModel.deleteMany({ service_id: serviceId });

          const start = moment(startDate);
          const end = moment(endDate);

          let current = start.clone();
          const slotDocs = [];

          while (current.isSameOrBefore(end, "day")) {
            slots.forEach((slot) => {
              const slotStart = moment(current)
                .set("hour", slot.start)
                .set("minute", 0)
                .toDate();
              const slotEnd = moment(current)
                .set("hour", slot.end)
                .set("minute", 0)
                .toDate();
              slotDocs.push({
                service_id: savedService._id,
                user_id: req.user._id,
                date: current.toDate(),
                start: slotStart,
                end: slotEnd,
              });
            });
            current.add(1, "day");
          }

          const savedSlots = await SlotModel.insertMany(slotDocs);
          service.slot_id = savedSlots.map((slot) => slot._id);
        }
      }

      const updatedService = await service.save();
      SuccessHandler(res, updatedService, 200, "Service updated successfully");
    } catch (err) {
      return next(ErrorHandler.badRequestError(err));
    }
  },
  async doRemoveService(req, res, next) {
    const { id } = req.params;
    try {
      const service = await ServicesModel.findByIdAndDelete(id);
      if (!service) {
        return next(ErrorHandler.notFoundError("Service not found"));
      }
      await SlotModel.deleteMany({ service_id: id });
      SuccessHandler(res, null, 200, "Service removed successfully");
    } catch (err) {
      //   res.status(400).json({ message: err.message });
      return next(ErrorHandler.badRequestError(err));
    }
  },
};
export default SubAdminController;
