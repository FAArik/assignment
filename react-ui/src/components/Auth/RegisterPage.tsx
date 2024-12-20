import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

import {authService} from '../../services/authService';



const LoginPage: React.FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();


    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            var response = await authService.register(
                firstName,
                lastName,
                email,
                password
            );
            if (response.status == 201)
                navigate('/login');

        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100 bg-warning-subtle">
            <div className="col-12 d-flex justify-content-center">
                <div className="card">
                    <div className={"card"}>
                        <div className={"card-header text-center"}>
                            <h2>Register</h2>
                        </div>
                        <div className={"card-body"}>
                            <form onSubmit={handleRegister}>
                                <div className="input-group mb-3">
                                    <input
                                        id={"firstName"}
                                        type="text"
                                        placeholder="First Name"
                                        value={firstName}
                                        className="form-control"
                                        aria-label="FirstName"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <input
                                        id={"lastName"}
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastName}
                                        className="form-control"
                                        aria-label="LastName"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="email-addon">@</span>
                                    </div>
                                    <input
                                        id={"email"}
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
                                        id={"password"}
                                        type="text"
                                        placeholder="Password"
                                        value={password}
                                        className="form-control"
                                        aria-label="Email"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className={"input-group mb-3 flex justify-content-center "}>
                                    <button className={"btn btn-primary col-5"} type="submit">Register</button>
                                </div>
                            </form>
                        </div>
                        <div className={"card-footer"}>
                            <p>You already have account? <Link to={"/login"}>Login</Link> here!</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;