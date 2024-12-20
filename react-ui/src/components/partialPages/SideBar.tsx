import {Link} from "react-router-dom";
import {MainContent} from "../../models/MainContent.ts";
import {useAuth} from "../Auth/AuthContext.tsx";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {toSvg} from "jdenticon";

interface User extends JwtPayload{
    name:string
}

const Sidebar = ({children}: MainContent) => {
    const {logout, token} = useAuth();
    const user:User = jwtDecode(token!);
    const image = toSvg(token!, 30);

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div
                        className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link align-middle px-0">
                                    <i className="fs-4 bi-house"></i> <span
                                    className="ms-1 d-none d-sm-inline">Home</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/companies"} className="nav-link align-middle px-0">
                                    <i className="fs-4 bi-house"></i> <span
                                    className="ms-1 d-none d-sm-inline">Companies</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/products"} className="nav-link align-middle px-0">
                                    <i className="fs-4 bi-house"></i> <span
                                    className="ms-1 d-none d-sm-inline">Products</span>
                                </Link>
                            </li>
                        </ul>
                        <hr/>
                        <div className="dropdown pb-4">
                            <a href="#"
                               className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                               id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <div
                                    dangerouslySetInnerHTML={{__html: image}}
                                    style={{width: '30px', height: '30px'}}
                                />
                                <span className="d-none d-sm-inline mx-1">{user.name}</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                <li><button className="dropdown-item" onClick={logout}>Sign out</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col py-3">
                    {children}
                </div>
            </div>
        </div>
    );
}


export default Sidebar;
