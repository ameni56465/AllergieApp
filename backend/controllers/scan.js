const Product = require("../models/scan");


const getByCodeController = async (req, res) => {
    const code = req.params.code;

    try {
        const product = await Product.findOne({ code });

        if (!product) {
            return res.status(404).send("Product not found");
        }

        // Return only the desired fields
        const { name, photo, composition } = product;
        return res.status(200).json({ name, photo, composition });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};


const createproduct = async (req, res) => {
    const { code, name, photo, composition } = req.body;

    try {
        const newProduct = await Product.create({
            code, name, photo, composition
        });
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getByCodeController ,createproduct };
