import express from "express";
import Product from "../models/product.model.js";

var router = express.Router();

/* GetAll products */
router.get("/getAll", async function (req, res) {
    var allProducts = await Product.find({}).populate('companyId');
    res.json(allProducts);
});

/* Get product by id */
router.get("/:id", async function (req, res) {
    var id = req.params.id;

    if (!id) res.status(500).json("No id specified");

    var productById = await Product.findById(id);

    if (!productById) res.status(404).json(`Product with ${id} not found`);

    res.json(productById);
});

/* Add new product by id */
router.post("/addProduct", async function (req, res) {
    const {
        productName,
        productCategory,
        productAmount,
        productUnit,
        companyId,
    } = req.body;

    try {
        const newProduct = new Product({
            productName,
            productCategory,
            productAmount,
            productUnit,
            companyId
        });

        const product = await newProduct.save();
        res.json(product._id);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.put("/updateProduct", async function (req, res) {
    const {
        id,
        productName,
        productCategory,
        productAmount,
        productUnit,
        companyId,
    } = req.body;

    try {
        await Product.findByIdAndUpdate(id, {
            productName,
            productCategory,
            productAmount,
            productUnit,
            companyId
        });

        res.json("Product updated successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

router.delete("/deleteProduct/:productId", async function (req, res) {
    const id = req.params.productId;
    console.log(id)
    if (!id) res.status(500).json("No id specified");

    try {
        await Product.deleteOne({_id: id});

        res.json("Product deleted successfully");

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

export default router;
