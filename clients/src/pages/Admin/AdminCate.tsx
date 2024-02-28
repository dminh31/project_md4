import React, { useEffect, useState } from "react";
import publicAxios from '../../config/publicAxios'
import { failedNoti, successNoti } from "../utils/noti";
import { NavLink, useNavigate } from "react-router-dom";
import privateAxios from "../../config/privateAxios";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";

interface Category {
    cateId:number;
    nameCate: string
}
export default function AdminCate() {
    const [newCate, setNewCate] = useState({
        nameCate: "",
        cateId: ""
    });
    const [categories, setCategories] = useState([]);
    const handleGetAllCate = async () => {
        try {
            const response = await publicAxios.get("/api/v1/categories");
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleGetAllCate();
    }, []);

    const handleAddCate = async () => {
        const newCateGory = {
            nameCate: newCate,
        };
        if (newCate.nameCate === "") {
            failedNoti("Vui lòng điền đầy đủ thông tin")
            return

        }
        try {
            const response = await privateAxios.post("/api/v1/categories", newCateGory.nameCate)
            setCategories(response.data.cates)
            alert(response.data.message)
            setNewCate({
                nameCate: "",
                cateId: ""
            })
        } catch (error) {
            console.log(error)
        }
    };

    const handleEdit = (item: any) => {
        setNewCate(item);
    };

    const handleSave = async () => {
        try {
            const res = await privateAxios.put(`/api/v1/categories/${newCate.cateId}`, newCate)
            setCategories(res.data.cates)
            setNewCate({
                nameCate: "",
                cateId: ""
            })
        } catch (error) {
            console.log(error)
        }
    };

    const handleDelete = async (id: number) => {
        const confirm = window.confirm("Bạn có muốn xóa");
        if (confirm) {
            try {
                const res = await privateAxios.delete(`/api/v1/categories/${id}`)
                setCategories(res.data.cates)
                successNoti(res.data.message)
            } catch (error) {
                console.log(error)
            }
        }
    };

    const handleLogOut = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        window.location.href = "/login ";
    };
    const navigate = useNavigate()
    const handleLogo = () => {
        navigate("/")
    }
    return (
        <div className="admin">
            <header className="admin__header">
                <a href="#" className="logo">
                    <h1 onClick={handleLogo}>FRESH GARDEN</h1>
                </a>
                <div className="toolbar">
                    {/* <button className="btn btn--primary">
                        Add New Plumbus
                    </button> */}
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            </header>
            <nav className="admin__nav">
                <ul className="menu">
                    <li className="menu__item">
                        <NavLink to={"/adminProduct"}>
                            <span className="text-2xl ">Quản lí sản phẩm</span>
                        </NavLink>
                    </li>

                    <li className="menu__item">
                        <NavLink to={"/adminBill"}>
                            <span className="text-2xl ">Quản lí đơn hàng</span>
                        </NavLink>
                    </li>

                    <li className="menu__item">
                        <NavLink to={"/adminUser"}>
                            <span className="text-2xl">Quản lí người dùng</span>
                        </NavLink>
                    </li>

                    <li className="menu__item">
                        <NavLink to={"/adminCate"}>
                            <span className="text-2xl">Phân loại sản phẩm</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <main className="admin__main">
                <div>
                    <label htmlFor="" className="text-2xl">
                        Loại sản phẩm:
                    </label>
                    <input
                        type="text"
                        className="ml-2 px-1"
                        name="nameCate"
                        value={newCate.nameCate}
                        onChange={(e) =>
                            setNewCate({ ...newCate, nameCate: e.target.value })
                        }
                    />
                    <br />
                    <button className='text-2xl' onClick={newCate.cateId ? handleSave : handleAddCate}>{newCate.cateId ? "Lưu" : "Thêm"}</button>
                </div>

                <div className="card p-0 g-col-8 shadow border-0 h-[600px] w-[81vw]">
                    {/* <div className="card-header">
                        <h5 className="mb-0 title ">Danh Sách Sản Phẩm</h5>
                    </div> */}
                    <div className="table-responsive">
                        <table className="table table-hover table-nowrap">
                            <thead className="thead-light ">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Tên </th>
                                    <th scope="col">Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((item: Category, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.nameCate}</td>
                                            <td>
                                                <button
                                                    className="bg-rose-400 rounded-3  text-white hover:bg-rose-500 w-[50px]"
                                                    // variant="contained"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    <FiEdit3 size={25} className="ml-3" />
                                                </button>
                                                <br />
                                                <br />
                                                <button
                                                    className="bg-rose-400 rounded-3  text-white hover:bg-rose-500 w-[50px]"
                                                    // variant="contained"
                                                    onClick={() => handleDelete(item.cateId)}
                                                >
                                                    <RiDeleteBin2Line size={25} className="ml-3" />
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
