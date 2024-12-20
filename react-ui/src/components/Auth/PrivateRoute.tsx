import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {PrivateRouteProps} from "../../models/PrivateRouteProps.ts";



export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
};