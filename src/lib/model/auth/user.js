import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isadmin: {
    type: String,
    default: "no",
    enum: ["yes", "no"],
  },
}, {
  collection: "auth" // 👈 ensures it uses the 'auth' collection in the 'quiz' database
});

// ✅ Prevents model overwrite error
export const User = mongoose.models.auth || mongoose.model("auth", UserSchema);
