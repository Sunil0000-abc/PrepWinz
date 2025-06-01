import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // stored as plain text (NOT secure)
});

export const User = mongoose.models.auth || mongoose.model("auth", userSchema);
