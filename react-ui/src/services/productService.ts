import axiosInstance from './axios.ts';

export const productService = {
    getAllProducts: async () => {
        const response = await axiosInstance.get(`/products/getAll`)
        return response.data;
    },
    getProductById: async (id: number) => {
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data;
    },
    addProduct: async (
        productName: string,
        productCategory: string,
        productAmount: number,
        productUnit: string,
        companyId: string,
    ) => {
        const response = await axiosInstance.post(`/products/addProduct`, {
            productName,
            productCategory,
            productAmount,
            productUnit,
            companyId,
        });
        return response.data;
    },
    updateProduct: async (
        id: string,
        productName: string,
        productCategory: string,
        productAmount: number,
        productUnit: string,
        companyId: string,
    ) => {
        const response = await axiosInstance.put(`/products/updateProduct`, {
            id,
            productName,
            productCategory,
            productAmount,
            productUnit,
            companyId
        });
        return response.data;
    },
    deleteProduct: async (
        ProductId: string,
    ) => {
        const response = await axiosInstance.delete(`/products/deleteProduct/${ProductId}`, {});
        return response.data;
    },
};
