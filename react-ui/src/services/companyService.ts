import axiosInstance from './axios.ts';
import {Company} from "../models/Company.model.ts";

interface getLatestCompanies {
    companies: Company[];
}

interface getCompanyCountResponse {
    count: number;
}

export const companyService = {
    getAllCompanies: async () => {
        const response = await axiosInstance.get<Company[]>(`/companies/getAll`);
        return response.data;
    },
    getCompanyCount: async () => {
        const response = await axiosInstance.get<getCompanyCountResponse>(`/companies/count`);
        return response.data;
    },
    getLatestCompanies: async () => {
        const response = await axiosInstance.get<getLatestCompanies>(`/companies/latest`);
        return response.data;
    },
    getCompanyById: async (id: number) => {
        const response = await axiosInstance.get<Company>(`/companies/${id}`);
        return response.data;
    },
    addCompany: async (
        companyName: string,
        companyLegalNumber: string,
        incorporationCountry: string,
        website: string
    ) => {
        const response = await axiosInstance.post(`/companies/addCompany`, {
            companyName,
            companyLegalNumber,
            incorporationCountry,
            website
        });
        return response.data;
    },
    updateCompany: async (
        id: string,
        companyName: string,
        companyLegalNumber: string,
        incorporationCountry: string,
        website: string
    ) => {
        const response = await axiosInstance.put(`/companies/updateCompany`, {
            id,
            companyName,
            companyLegalNumber,
            incorporationCountry,
            website
        });
        return response.data;
    },
    deleteCompany: async (
        companyId: string,
    ) => {
        const response = await axiosInstance.delete(`/companies/deleteCompany/${companyId}`, {});
        return response.data;
    },
};
