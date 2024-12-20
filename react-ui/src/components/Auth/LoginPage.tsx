import React, {useState} from 'react';
import {useAuth} from './AuthContext';
import {Link, useNavigate} from "react-router-dom";
import {authService} from '../../services/authService';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await authService.login(email, password);
            if (response.status == 200) {

                login(response.data.token);
                navigate("/")
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 bg-success-subtle">
            <div className="col-12 d-flex justify-content-center">
                <div className="card">
                    <div className="card-header text-center">
                        <h2>Login</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="email-addon">@</span>
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    className="form-control"
                                    aria-label="Email"
                                    aria-describedby="email-addon"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    className="form-control"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary col-5" type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-center">
                        <p>Don't have an account? <Link to="/register">Register</Link> here!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;