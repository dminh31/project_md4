import { Navigate, Outlet } from "react-router-dom";
import AdminProduct from "../Admin/AdminProduct";

const PrivateRouter = (): any => {
    const user = JSON.parse(String(localStorage.getItem("currentUser")));
    return user?.role === 1 ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;