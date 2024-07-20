import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    attachment: {
      filename: { type: String },
      filesize: { type: String },
      public_url: { type: String },
      public_key: { type: String },
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: { type: String, default: "USD" },
    is_active: {
      type: Boolean,
      default: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slot_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Slot" }],
  },
  { timestamps: true }
);

const serviceModel = mongoose.model("Service", serviceSchema);

export default serviceModel;
