// src/lib/db.js
import mongoose from "mongoose";

const connstr = process.env.MONGODB_URI;

export const connectDB = async () => {
  
  if (!connstr) {
    throw new Error("MongoDB connection string is undefined");
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connstr);
    
  }
};
