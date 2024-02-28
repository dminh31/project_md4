import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import publicAxios from '../../config/publicAxios';
import formatDate from '../../config/formatDate';
export default function Bill() {
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const userLogin = JSON.parse(localStorage.getItem("currentUser") || "");

    const [bill, setBill] = useState([])
    const handleGetBill = async () => {
        try {
            const res = await publicAxios.get(`/api/v1/bills/${userLogin.userId}`);
            setBill(res.data.bills)
        } catch (error) {
            console.log(error)
        }
    }
    const [show, setShow] = useState(false);
    const [infoDetail, setInfoDetails] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = async (details: any) => {
        setShow(true);
        try {
            const response = await publicAxios.get(`/api/v1/billDetail/${details.billId}`)
            setInfoDetails(response.data)
        } catch (error) {
            console.log(error)
        }
    };

    const [flag, setFlag] = useState(true)
    const handleChangeStatus = async (id: number, status: any) => {
        let accept = window.confirm("Bạn muốn thực hiện hành đông không");
        if (accept) {
            await publicAxios.put(`/api/v1/update/${id}`, {
                status: status,
            });
        }
        handleGetBill();
        setFlag(!flag);
    }

    useEffect(() => {
        handleGetBill()
    }, [flag])
    return (
        <div>
            <div className="text-center mt-[80px]" >
                <h3 className="text-4xl font-extrabold">Đơn hàng của bạn</h3>
                <div className="bg-black w-24 h-1 m-auto mt-3"></div>
                <table cellPadding={40} cellSpacing={30} className='text-xl mt-2 m-auto w-[80%] '>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Địa chỉ nhận hàng</th>
                            <th>Thông tin sản phẩm</th>
                            <th>Tổng tiền</th>
                            <th>Tình trạng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bill.map((item: any, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.address}</td>

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
                                    {item.status === "Đang xử lý" ? (
                                        <button onClick={() => handleChangeStatus(item.billId, "Đã hủy")}>Hủy đơn</button>
                                    ) : (
                                        ""
                                    )}
                                </td>
                            </tr>
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
                                <p>Tên: {item.nameProduct}</p>
                                <p>Thời gian mua hàng: {formatDate(item.createdAt)}</p>
                                {/* <img src={item.image} alt="" /> */}
                                <p>Số Lượng: {item.quantity}</p>
                                <p>Giá Sản Phẩm: {VND.format(item.price)}</p>
                            </div>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}
