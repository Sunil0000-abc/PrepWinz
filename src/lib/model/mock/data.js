import mongoose from "mongoose";

const MockModel = new mongoose.Schema({
    name:String,
    a:String,
    b:String,
    c:String,
    d:String,
    correct:String
});

export const Product = mongoose.models.test || mongoose.model("test",MockModel);