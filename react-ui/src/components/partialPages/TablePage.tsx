import {PrivateRouteProps} from "../../models/PrivateRouteProps.ts";

const TablePage = ({ children }: PrivateRouteProps) => {
    return (
        <div className={"container-fluid p-2 m-2"}>
            {children}
        </div>);
};

export default TablePage;