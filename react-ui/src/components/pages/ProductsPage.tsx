import React, {useEffect, useState} from 'react';
import {Product} from "../../models/Product.model.ts";
import {Link} from "react-router-dom";
import {productService} from "../../services/productService.ts";
import ProductModalForm from "../partialPages/ProductModalForm.tsx";
import {Company} from "../../models/Company.model.ts";


const ProductTable: React.FC = () => {
    const [data, setData] = useState<Product[]>([]);
    const [searched, setSearched] = useState<Product[]>([])
    const [searchInp, setsearchInp] = useState<string>("")
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const companies = await productService.getAllProducts();
            console.log(companies);
            setData(companies);
        } catch (error) {
            console.error('Error fetching companies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setCurrentItem(null);
        setShowModal(true);
    };

    const handleEdit = (Product: Product) => {
        setCurrentItem(Product);
        setShowModal(true);
    };

    const handleSave = async (product: Product) => {
        try {
            if (product._id) {
                await productService.updateProduct(
                    product._id,
                    product.productName,
                    product.productCategory,
                    product.productAmount,
                    product.productUnit,
                    product.companyId as string
                );
            } else {
                await productService.addProduct(
                    product.productName,
                    product.productCategory,
                    product.productAmount,
                    product.productUnit,
                    product.companyId as string
                );
            }
            fetchProducts();
        } catch (error) {
            console.error('Error saving Product:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await productService.deleteProduct(id);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting Product:', error);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        var searchText = e.target.value.trim()
        setsearchInp(searchText);
        setSearched(data.filter((prod) => prod.productName.toLowerCase().includes(searchText.toLowerCase()) || prod.productCategory.toLowerCase().includes(searchText.toLowerCase()) || prod.productAmount.toString().toLowerCase().includes(searchText.toLowerCase()) || prod.productUnit.toLowerCase().includes(searchText.toLowerCase()) || (prod.companyId as Company).companyName.toLowerCase().includes(searchText.toLowerCase()) || (prod.companyId as Company).website.toLowerCase().includes(searchText.toLowerCase()) || (prod.companyId as Company).companyLegalNumber.toLowerCase().includes(searchText.toLowerCase())))
    };

    return (
        <div className="">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Products</li>
                </ol>
            </nav>

            <div className={"d-flex align-items-center justify-content-between"}>
                <button className="btn btn-success mb-3" onClick={handleCreate}>
                    Add New Product
                </button>
                <div className={"pe-5"}>
                    <input className={"form-control"} placeholder={"Search"} onChange={handleSearch}/>
                </div>
            </div>


            {loading ? (
                <p>Loading products...</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Owner Company</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Unit</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(searchInp != '' ? searched : data).map((row) => (
                            <tr key={row._id}>
                                <td>{row._id}</td>
                                <td>{(row.companyId as Company)?.companyName}</td>
                                <td>{row.productName}</td>
                                <td>{row.productCategory}</td>
                                <td>{row.productAmount}</td>
                                <td>{row.productUnit}</td>
                                <td>
                                    <button className="btn btn-primary m-1" onClick={() => handleEdit(row)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger m-1" onClick={() => handleDelete(row._id!)}>
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            )}

            <ProductModalForm show={showModal} handleClose={handleClose} handleSave={handleSave}
                              currentItem={currentItem}/>
        </div>
    )
        ;
};

export default ProductTable;