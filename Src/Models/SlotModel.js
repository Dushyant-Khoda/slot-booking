import mongoose from "mongoose";
const SlotSchema = new mongoose.Schema(
  {
    service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    date: { type: String, required: true },
    // Created By
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    booked_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    start: Date,
    end: Date,
    is_booked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SlotModel = mongoose.model("Slot", SlotSchema);

export default SlotModel;
