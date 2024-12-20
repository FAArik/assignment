import axiosInstance from "./axios.ts";

interface LoginResponse {
    token: string;
}
export const authService = {
    login: async (
        email: string,
        password: string
    ) => {
        try {
            return await axiosInstance.post<LoginResponse>(`/auth/login`, {
                email,
                password
            });
        } catch (error) {
            throw new Error('Login failed');
        }
    },

    register: async (
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) => {
        try {
            return await axiosInstance.post(`/auth/register`, {
                firstName,
                lastName,
                email,
                password
            });
        } catch (error) {
            throw new Error('Registration failed');
        }
    }
};
