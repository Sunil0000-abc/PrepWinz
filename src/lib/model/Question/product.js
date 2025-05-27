
import mongoose from "mongoose";

const productModel = new mongoose.Schema({
    name:String,
    one:String,
    two:String,
    three:String,
    four:String,
    Company:String
});

export const Product = mongoose.models.questions || mongoose.model("questions",productModel);