import React, {useState, useEffect} from 'react';
import CompanyModalForm from '../partialPages/CompanyModalForm.tsx';
import {companyService} from '../../services/companyService.ts';
import {Company} from "../../models/Company.model.ts";
import {Link} from "react-router-dom";


const CompaniesPage: React.FC = () => {
    const [data, setData] = useState<Company[]>([]);
    const [searched, setSearched] = useState<Company[]>([])
    const [searchInp, setsearchInp] = useState<string>("")
    const [showModal, setShowModal] = useState(false);
    const [currentItem, setCurrentItem] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCompanies();
    }, []);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        try {
            setLoading(true);
            const companies = await companyService.getAllCompanies();
            if (companies.length === 0)
                setData([]);

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

    const handleEdit = (Company: Company) => {
        setCurrentItem(Company);
        setShowModal(true);
    };

    const handleSave = async (company: Company) => {
        try {
            if (company._id) {
                await companyService.updateCompany(
                    company._id,
                    company.companyName,
                    company.companyLegalNumber,
                    company.incorporationCountry,
                    company.website,
                );
            } else {
                await companyService.addCompany(
                    company.companyName,
                    company.companyLegalNumber,
                    company.incorporationCountry,
                    company.website,
                );
            }
            fetchCompanies();
        } catch (error) {
            console.error('Error saving Company:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await companyService.deleteCompany(id);
            fetchCompanies();
        } catch (error) {
            console.error('Error deleting Company:', error);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        var searchText = e.target.value.trim()
        setsearchInp(searchText);
        setSearched(data.filter((comp) => comp.companyName.toLowerCase().includes(searchText.toLowerCase()) || comp.website.toLowerCase().includes(searchText.toLowerCase()) || comp.companyLegalNumber.toLowerCase().includes(searchText.toLowerCase())))
    };


    return (
        <div className="">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Companies</li>
                </ol>
            </nav>

            <div className={"d-flex align-items-center justify-content-between"}>
                <button className="btn btn-success mb-3" onClick={handleCreate}>
                    Add New Company
                </button>
                <div className={"pe-5"}>
                    <input className={"form-control"} placeholder={"Search"} onChange={handleSearch}/>
                </div>
            </div>

            {loading ? (
                <p>Loading companies...</p>
            ) : (
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Legal Number</th>
                        <th>Country</th>
                        <th>Website</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(searchInp != '' ? searched : data).map((row) => (
                        <tr key={row._id}>
                            <td>{row._id}</td>
                            <td>{row.companyName}</td>
                            <td>{row.companyLegalNumber}</td>
                            <td>{row.incorporationCountry}</td>
                            <td>
                                <a href={`https://${row.website}`} target="_blank" rel="noopener noreferrer">
                                    {row.website}
                                </a>
                            </td>
                            <td>
                                <button className="btn btn-primary m-1" onClick={() => handleEdit(row)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger m-1" onClick={() => handleDelete(row._id!)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <CompanyModalForm show={showModal} handleClose={handleClose} handleSave={handleSave}
                              currentItem={currentItem}/>
        </div>
    );
};

export default CompaniesPage;
