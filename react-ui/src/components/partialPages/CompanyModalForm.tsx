import React, {useState, useEffect} from 'react';
import {Company} from "../../models/Company.model.ts";
import {CompanyModalFormProps} from "../../models/ModelFormProps.model.ts";


const CompanyModalForm: React.FC<CompanyModalFormProps> = ({show, handleClose, handleSave, currentItem}) => {
    const [formData, setFormData] = useState<Company>({
        companyName: '',
        companyLegalNumber: '',
        incorporationCountry: '',
        website: '',
    });

    useEffect(() => {
        if (currentItem) {
            setFormData(currentItem);
        } else {
            setFormData({companyName: '', companyLegalNumber: '', incorporationCountry: '', website: ''});
        }
    }, [currentItem]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = () => {
        handleSave(formData);
        handleClose();
        setFormData({companyName: '', companyLegalNumber: '', incorporationCountry: '', website: ''});
    };

    return (
        <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{currentItem ? 'Update Company' : 'Add New Company'}</h5>

                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label>Company Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Legal Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="companyLegalNumber"
                                    value={formData.companyLegalNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Country</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="incorporationCountry"
                                    value={formData.incorporationCountry}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Website</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    required
                                />
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

export default CompanyModalForm;
