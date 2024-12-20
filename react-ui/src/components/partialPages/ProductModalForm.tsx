import React, {useState, useEffect} from 'react';
import {ProductModalFormProps} from '../../models/ModelFormProps.model.ts';
import {Product} from '../../models/Product.model.ts';
import {companyService} from '../../services/companyService.ts';
import {Company} from '../../models/Company.model.ts';

const ProductModalForm: React.FC<ProductModalFormProps> = ({
                                                               show,
                                                               handleClose,
                                                               handleSave,
                                                               currentItem,
                                                           }) => {
    const [formData, setFormData] = useState<Product>({
        productName: '',
        productCategory: '',
        productAmount: 0,
        productUnit: '',
        companyId: '',
    });

    const [compData, setCompData] = useState<Company[]>([]);

    useEffect(() => {
        if (currentItem) {
            setFormData(
                {
                    _id: currentItem._id,
                    productName: currentItem.productName,
                    productCategory: currentItem.productCategory,
                    productAmount: currentItem.productAmount,
                    productUnit: currentItem.productUnit,
                    companyId: (currentItem.companyId as Company)._id as string,
                }
            );
        } else {
            setFormData({
                productName: '',
                productCategory: '',
                productAmount: 0,
                productUnit: '',
                companyId: '',
            });
        }

        companyService.getAllCompanies().then((response) => {
            if (response) {
                setCompData(response);
            } else {
                setCompData([]);
            }
        });
    }, [currentItem]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = () => {
        handleSave(formData);
        handleClose();
    };

    return (
        <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{currentItem ? 'Update Product' : 'Add New Product'}</h5>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Product Category</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="productCategory"
                                    value={formData.productCategory}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Product Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="productAmount"
                                    value={formData.productAmount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Product Unit</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="productUnit"
                                    value={formData.productUnit}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Company</label>
                                <select
                                    className="form-control"
                                    name="companyId"
                                    value={formData.companyId as string}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a Company</option>
                                    {compData.map((company) => (
                                        <option key={company._id} value={company._id}>
                                            {company.companyName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                            {currentItem ? 'Update' : 'Add'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModalForm;