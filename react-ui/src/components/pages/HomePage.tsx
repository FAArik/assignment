import {useState, useEffect} from 'react';
import {companyService} from '../../services/companyService';
import {Company} from "../../models/Company.model.ts";

const Homepage = () => {
    const [companyCount, setCompanyCount] = useState(0);
    const [latestCompanies, setLatestCompanies] = useState<Company[]>([]);

    useEffect(() => {
        fetchCompanyData();
    }, []);

    const fetchCompanyData = async () => {
        try {
            const countData = await companyService.getCompanyCount();
            setCompanyCount(countData.count);

            const latestData = await companyService.getLatestCompanies();
            setLatestCompanies(latestData.companies);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="container m-3 p-3">
            <div className="row g-4">
                <div className="col-md-4">
                    <div className="card text-white bg-primary shadow h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <h5 className="card-title">
                                    <i className="fa-solid fa-building me-2"></i>
                                    Total Companies
                                </h5>
                            </div>
                            <h2 className="display-4">{companyCount}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card bg-light shadow h-100">
                        <div className="card-body">
                            <h5 className="card-title">
                                <i className="fa-solid fa-list me-2"></i>
                                Lastly Added Companies
                            </h5>
                            <ul className="list-group list-group-flush">
                                {latestCompanies.length > 0 ? (
                                    latestCompanies.map((company, index) => (
                                        <li key={index} className="list-group-item">
                                            {company.companyName}
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item">No recent companies added.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
