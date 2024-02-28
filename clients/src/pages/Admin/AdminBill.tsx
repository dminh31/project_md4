import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import privateAxios from "../../config/privateAxios";
import publicAxios from "../../config/publicAxios";
import { BiMessageSquareX } from "react-icons/bi";
import { BiMessageSquareCheck } from "react-icons/bi";
export default function AdminBill() {
    const [bills, setBills] = useState([]);
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const handleGetBills = async () => {
        try {
            const res = await publicAxios.get("/api/v1/bills")
            console.log(res.data.bills)
            setBills(res.data.bills)
        } catch (error) {
            console.log(error)
        }
    };

    const [show, setShow] = useState(false);
    const [infoDetail, setInfoDetails] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = async (details: any) => {
        console.log(details);
        setShow(true);
        try {
            const response = await privateAxios.get(`/api/v1/billDetail/${details.billId}`)
            setInfoDetails(response.data)
        } catch (error) {
            console.log(error)
        }
    };
    const [flag, setFlag] = useState(true)
    const handleChangeStatus = async (id: number, status: string) => {
        let accept = window.confirm("Bạn muốn thực hiện hành đông không");
        if (accept) {
            await privateAxios.put(`/api/v1/update/${id}`, {
                status: status,
            });
        }
        await handleGetBills();
        setFlag(!flag);
    };

    const handleLogOut = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("token");
        window.location.href = "/login ";
    };

    useEffect(() => {
        handleGetBills();
    }, []);

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
                    <div className="table-responsive">
                        <table className="table table-hover table-nowrap">
                            <thead className="thead-light ">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Người mua hàng </th>
                                    <th scope="col">Thông tin đơn hàng </th>
                                    <th scope="col">Tổng tiền </th>
                                    <th scope="col">Trạng thái </th>
                                    <th scope="col">Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bills.map((item: any, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.username}</td>
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    onClick={() => handleShow(item)}
                                                    className="bg-slate-500 text-[15px]"
                                                >
                                                    Xem Chi Tiết
                                                </Button>
                                            </td>
                                            <td>{VND.format(item.total)}</td>
                                            <td>
                                                {item.status === "Đang xử lý" ? (
                                                    <span style={{ color: "green" }}>Đang Chờ</span>
                                                ) : item.status === "Xác nhận" ? (
                                                    <span style={{ color: "blue" }}>Xác nhận</span>
                                                ) : (
                                                    <span style={{ color: "red" }}>Từ chối</span>
                                                )}

                                            </td>
                                            <td>
                                                <button className='border-2 bg-red-500 text-white px-2 p-1 rounded-lg' onClick={() => handleChangeStatus(item.billId, "Đã hủy")}><BiMessageSquareX size={25} /></button>
                                                <button className='border-2 bg-orange-500 text-white px-2 p-1 rounded-lg' onClick={() => handleChangeStatus(item.billId, "Xác nhận")}><BiMessageSquareCheck size={25} /></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Sản Phẩm</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {infoDetail.map((item: any) => (
                                    <div className="titles_produsctsx text-center">
                                        <hr />
                                        <p>Sản phẩm: {item.nameProduct}</p>
                                        <p>Số Lượng: {item.quantity}</p>
                                        <p>Giá : {VND.format(item.price)}</p>
                                        <p>Thời gian mua hàng: {item.createdAt}</p>
                                        <p>Địa chỉ nhận: {item.address}</p>
                                    </div>
                                ))}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
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
