const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    photo: { type: String, required: true },
    composition: { type: String, required: true }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

