import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    // Product Name - Product Category - Product Amount - Amount Unit - Company (In relation with companies from Company table)

    {
        productName: {type: String, required: true},
        productCategory: {type: String, required: true},
        productAmount: {type: Number, required: true},
        productUnit: {type: String, required: true},
        companyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        }
    },
    {timestamps: true}
);

const Product = mongoose.model("Product", productSchema);

export default Product;
