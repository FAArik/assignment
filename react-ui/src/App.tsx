import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {AuthProvider} from './components/Auth/AuthContext';
import LoginPage from './components/Auth/LoginPage';
import HomePage from './components/pages/HomePage';
import {PrivateRoute} from './components/Auth/PrivateRoute';
import CompaniesPage from "./components/pages/CompaniesPage.tsx";
import TablePage from "./components/partialPages/TablePage.tsx";
import RegisterPage from "./components/Auth/RegisterPage.tsx";
import ProductTable from "./components/pages/ProductsPage.tsx";
import Sidebar from "./components/partialPages/SideBar.tsx";
import './App.css';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<PrivateRoute><Sidebar><HomePage/></Sidebar></PrivateRoute>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/companies" element={<PrivateRoute>
                        <Sidebar>
                            <TablePage>
                                <CompaniesPage/>
                            </TablePage>
                        </Sidebar>
                    </PrivateRoute>
                    }/>
                    <Route path="/products" element={<PrivateRoute>
                        <Sidebar>
                            <TablePage>
                                <ProductTable/>
                            </TablePage>
                        </Sidebar>
                    </PrivateRoute>
                    }/>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;