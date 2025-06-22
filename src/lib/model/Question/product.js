
import mongoose from "mongoose";

const productModel = new mongoose.Schema({
    name:String,
    a:String,
    b:String,
    c:String,
    d:String,
    company:String,
    solution:String,
    correct:String
});

export const Product = mongoose.models.questions || mongoose.model("questions",productModel);