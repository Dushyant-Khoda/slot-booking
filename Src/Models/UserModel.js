import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES, JWT_SECRET } from "../../Config";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    created_by_admin: {
      type: Boolean,
      default: false,
    },
    slot: [
      {
        slotId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Slot",
        },
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
        },
      },
    ],
    role: {
      type: String,
      default: "user",
      enum: ["admin", "sub_admin", "user"],
    },
  },
  { timestamps: true }
);

// For converting password to Hash
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// For JWT Token Generation
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES,
  });
};

// For Compare Password
userSchema.methods.comparePassword = async function (userEnteredPassword) {
  return bcrypt.compare(userEnteredPassword, this.password);
};

const userModel = mongoose.model("User", userSchema);
export default userModel;
