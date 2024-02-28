import React, { useEffect, useState } from "react";
import publicAxios from "../../config/publicAxios";
import privateAxios from "../../config/privateAxios";
import { NavLink, useNavigate } from "react-router-dom";

interface User {
    userId: number;
    username: string;
    email: string;
    password: string
    role: number
    status_user: number
}

export default function AdminUser() {
    const [users, setUsers] = useState<User[]>([]);
    const handleGetUsers = async () => {
        try {
            const res = await privateAxios.get("/api/v1/users");
            setUsers(res.data.users);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetUsers();
    }, []);

    const handleChangeStatus = async (user_id: number) => {
        try {
            const response = await privateAxios.patch(
                `/api/v1/user/${user_id}`
            );
            setUsers(response.data.users);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogOut = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        window.location.href = "/login ";
    };

    const navigate = useNavigate();
    const handleLogo = () => {
        navigate("/");
    };
    return (
        <div className="admin">
            <header className="admin__header">
                <a href="#" className="logo">
                    <h1 onClick={handleLogo}>FRESH GARDEN</h1>
                </a>
                <div className="toolbar">
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            </header>
            <nav className="admin__nav">
                <ul className="menu">
                    <li className="menu__item">
                        <NavLink to={"/adminProduct"}>
                            <span className="text-2xl  ">Quản lí sản phẩm</span>
                        </NavLink>
                    </li>

                    <li className="menu__item">
                        <NavLink to={"/adminBill"}>
                            <span className="text-2xl  ">Quản lí đơn hàng</span>
                        </NavLink>
                    </li>

                    <li className="menu__item">
                        <NavLink to={"/adminUser"}>
                            <span className="text-2xl ">
                                Quản lí người dùng
                            </span>
                        </NavLink>
                    </li>

                    <li className="menu__item">
                        <NavLink to={"/adminCate"}>
                            <span className="text-2xl ">
                                Phân loại sản phẩm
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <main className="admin__main">
                <div className="card p-0 g-col-8 shadow border-0 h-[600px] w-[81vw]">
                    {/* <div className="card-header">
                        <h5 className="mb-0 title ">Danh Sách Người Dùng</h5>
                    </div> */}
                    <div className="table-responsive">
                        <table className="table table-hover table-nowrap">
                            <thead className="thead-light ">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên </th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col">Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user: User, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {user.status_user == 0
                                                    ? "Mở Khóa"
                                                    : "Khóa"}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        handleChangeStatus(
                                                            user.userId
                                                        )
                                                    }
                                                >
                                                    {user.status_user == 0
                                                        ? "Khóa"
                                                        : "Mở Khóa"}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div id="changePage"></div>
                </div>
            </main>

            <footer className="admin__footer">
                {/* <ul className="ticker">
                    <li className="ticker__item">BTC: +3.12%</li>
                    <li className="ticker__item">ETH: +1.29%</li>
                    <li className="ticker__item">XRP: -0.32%</li>
                    <li className="ticker__item">BCH: -2.82%</li>
                    <li className="ticker__item">EOS: +1.44%</li>
                    <li className="ticker__item">CSS: +13.37%</li>
                </ul> */}
                <span>© 2018 Grid Inc.</span>
            </footer>
        </div>
    );
}
