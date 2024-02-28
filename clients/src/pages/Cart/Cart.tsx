import React, { useEffect, useState } from "react";
import publicAxios from "../../config/publicAxios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { failedNoti, successNoti } from "../utils/noti";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { getCart } from "../../store/redux-toolkitt/Cart";
export default function Cart() {
    const [cart, setCart] = useState([]);
    const [flag, setFlag] = useState(false);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        // if (cart.length == 0) {
        //   failedNoti("Không có sản phẩm trong giỏ hàng ")
        //   return;
        // }
        setShow(true);
    };

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    const [total, setTotal] = useState(0);
    const handleTotalPrice = () => {
        let totalPrice = cart?.reduce((acc, item: any) => {
            return acc + item.price * item.quantity;
        }, 0);
        setTotal(totalPrice);
    };

    useEffect(() => {
        handleTotalPrice();
    }, [cart]);

    const userLogin = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const handleGetCart = async () => {
        try {
            const response = await publicAxios.get(
                `/api/v1/cart/${userLogin.userId}`
            );
            setCart(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleGetCart();
    }, [flag]);
    const dispatch = useDispatch()
    const handleDeleteCart = async (id: number) => {
        try {
            if (window.confirm("Ban muon xoa san pham")) {
                const res = await publicAxios.delete(`/api/v1/cart/${id}`);
                dispatch(getCart(userLogin?.userId))
                setFlag(!flag);
            }
        } catch (error) {
            console.log(11122221, error);
        }
    };

    const handleDecrease = async (item: any) => {
        if (item.quantity == 1) {
            handleDeleteCart(item.cartId);
            return;
        }
        const body = { cartId: item.cartId, type: "decre" };
        try {
            await publicAxios.patch(`/api/v1/cart`, body);
            setFlag(!flag);
        } catch (error) {
            console.log(error);
        }
    };

    const handleIncrease = async (item: any) => {
        if (item.quantity >= item.stock) {
            failedNoti("Không thể mua quá số lượng sản phẩm trong kho");
            return;
        }
        const body = { cartId: item.cartId, type: "incre" };
        try {
            const res = await publicAxios.patch(`/api/v1/cart`, body);
            setFlag(!flag);
        } catch (error) {
            console.log(error);
        }
    };
    const navigate = useNavigate();

    const handlePayment = async () => {
        if (!address || !phone) {
            failedNoti("Cần nhập đủ thông tin");
            return;
        }
        let err = 0;
        if (!/^(0|\+84)\d{9,10}$/.test(phone)) {
            message.error("Chưa đúng định dạng SĐT");
            err = 1;
        }

        if (err == 1) {
            return;
        }

        if (cart.length == 0) {
            failedNoti("Cần mua hàng !!");
            return;
        }

        try {
            const bill = {
                userId: userLogin.userId,
                address,
                phone,
                total,
            };
            const response = await publicAxios.post("/api/v1/bills", bill);
            const billDetail = {
                billId: response.data.newIdBill,
                cart,
            };
            await publicAxios.post("/api/v1/billDetail", billDetail);
            dispatch(getCart(userLogin?.userId))

            await publicAxios.delete(`/api/v1/carts/${userLogin.userId}`);
            successNoti("Thanh toan thanh cong");
            setCart([]);
            handleClose();
            navigate("/bill");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="text-center mt-3">
                <h3 className="text-4xl font-extrabold">Giỏ hàng của bạn</h3>
                {/* <div className="text-xl ">
                    Có{" "}
                    <span className=" font-bold text-[#b1c23c]">
                        {cart?.length} sản phẩm
                    </span>{" "}
                    trong giỏ
                </div> */}
                <div className="bg-black w-24 h-1 m-auto mt-3"></div>
                <div className="mt-1 px-5">
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Thanh Toán</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="street"
                                >
                                    Địa chỉ
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="street"
                                    type="text"
                                    placeholder="Nhập tên đường"
                                    onChange={(e) => setAddress(e.target.value)}
                                />{" "}
                                <br /> <br />
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="phone"
                                >
                                    Số điện thoại
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="phone"
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    onChange={(e) => setPhone(e.target.value)}
                                />{" "}
                                <br />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button
                                variant="primary"
                                className="bg-slate-500"
                                onClick={handlePayment}
                            >
                                Thanh Toán
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <table
                        cellPadding={20}
                        className="ml-[10%] text-xl w-[80%]"
                    >
                        <thead>
                            <tr>
                                <th></th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Thành tiền </th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart?.length == 0 ? (
                                <div className="text-center ml-[100%] w-[100%]">
                                    <img className="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABfVBMVEX/////pybu7u73mRwzMzNBQEIeiOX/oADw4cv84sL7mQD/ogDvU1Dx8fH4+Pj7jAAhISH/ryL3wZv/qyTt9vbt8/n+uGP2nR7V1dX6jwDuQT7um5rvTEnuZGI8Oz3uxcTvOjYvN0MAfuQbMEQoJinZ2dkvLy8ZGRkAheo5PEJXWFrHx8fLy8spKSmAYDrXkiyvr6/69O50c3W6uboAAACkyvJ4XDsmNEOcnJylpaWRkZGWbDe31fVMTEzPji5nZ2j96umCgoP7q6kVICbtupdrrfBQnOZCPDjQ3+zh7/uItuhnUz2JZjliYmLhlyrroCe0fTP719f4lJLucW7uq6r5xsX6jYz5nJr8gH7+t1jvNC7vZ2TDoIJVS0SZfGfYro1wXlH/0q0qle0AeOfB0OH5vZD606hYSDr98uTy1sNiqe+AuvP/zY+nh1srXIUjOVUZbrdDOCk7TGEvZpyoeDTbv6paldUhgda8hDEeGA4zKhj/3rf/x3n/uUbDsKMIYPmiAAARZklEQVR4nO2d/V/bRraHhSNRSpFqbFyo6ygx2PI72BiKMRjiJOQNDEmbtLcvaTZskiZpt7u37d7mZnfv337nTaPRq0eysEQ/+v7Q2sME5vGZOefMkTwShESJEiVKlChRokSJEiVKlChRokSJ/ixSyo1ue7fd7q6koh7KBUhp9AclTSTSxMPdctRDClWNzZaoSiaJmtr705hyV7XiYamlwz+FIduiaDCJmqaJqsowXno7pgY6n1gS68Neu93e7W8OSiVVZ+xFPcTJtEtIxFJ9t6wAyUDgf6nmUNV/NLjMZtzUiFfplxU5ZZKiNEaYUS01ox5nUCl1QtCTlZRdsrBSL6FPIN2OeqjBpAwQIHAmTnxIQreF++xGPdhAIoBtwZFNQNhyaiSSXpdPIwioamVnA8Ie6CfKEM3U9OVbi31oG1VNyY6AgEzQEXsIUZOjHjHSoy+uLixc/erJ+J5NNGzRbQHqjDJFVOsXPvrxUq5+du0aQCzkFx6N64vXoKsFkaDVEOIQ2luM3tvcWHj0ZT6/gHR9jBn7kLDU8ARkEFFYKUUe+QuPri8s5AuFfAEi3vDqmoLzTuxTJ7PkCLgkQyb0KaB5ujkdDlfdLBQWCnB6dr6GhvzSq+8m8qM64NK1z645MT5+jHwqNGYbIpYi3mmg+Ylffl3wNiIyCZ2jS4+/LVz/zI5YyOcLOqIyiN6IjwBhnjgYBb72WIlwFQLfqJsQfjR5GyKc6/kncC0CW8vI95ZSSjCFQnjj23w+r78Boys8du+rmdwMIrQhFlDjNRkGDdBTGCB3ivYe/hUKodB59OQGeQltWHC3YQMlYtTNyNeu2xERYOEqbBLgPJW7mukf+VM4hIzGrMMhmKRizxjskh2RAYTzFBhRRoYvx4Pw5hhfqlrHakNkAUkWrkD/q7XHRNDpECJADxOm7PPNgmgGhCuRTFN1M9g0vQhAD08Kl6E6NA/VhGgBhAMEpiuXgi/EUAGfwKHmPRyp0BMdphuDaAMk0xRnbpETQjfqDYgcTalpHQRFXLABgmkKCeGGMqCrCZPwJrBA/qZnl0Nnp0gQ7RYkC1FBn0wjcsLvwPj+y7tL3WW2EUQ7ICGEe2atG8iZhkm4YORuboLZieY0jqVrBQz4pSWDw87Ucf1OnxBO0hveXXBNwnEkxIQ3Lzmhqw2xF3XIUbGn6cVklubz344hHLmlXzqgDRFHC+xpIie88YTm326C6VdpxQWwcLVgR0QRXzl0+XdTJuQQ3B06zDY9TNjTcBlvgqXgqXeo4388tpbYhVlb35p+0ThoR0SOBtdqxOgz7ydfFcbV2cow8x5YCJlAb0OUUTWq2QL/rB59Xgq3hmMiPt7iuwI67hdhwFdN5bnICL/Ij0vasKsxBzZLqmZGxB3xMrSls9MnFL5a+HpcF7gQTfPNlouaEPHli5WSe6IwTrlP3PXNXKj4WHLL5BWXvizYclGCeP0R9DOo7A0Nb91VchMuX3HV/IcXQIimqbFdX7ID6oj5x7I+S1E1MVg0jIBwxVRVWvoqbwMkiN/eIO9QQmNzwBESKruDSsXjNhG4gVJHtCT8xdUv7CXvpWvffUeL/aiE0QqWlIZNWD7sN3qVliiKFffLtk3zgJeWHC/NGK2oqB+4WhouoVLRWukWuv2uNXTtJNR9FV3Q5jdo1h024W5LpDcYjlwJlXIazlPOdSV30cW1w6AmDJeQ3kAJZqnr/ROKovQ07kHLK2kpeJktbMI+NeGtW+6eRlHIZV2Ro8Ir40Jp8DkaLmGFAn6fcf+nCuRClW9xrBUVfE+DFjAjDZuwnMY+5tatp5lMxpNQRksRrEXvuxWEXdSNx9hTIWym0fz84dn3APBlx4swJTcxostNUUhK6hCbejQJYKg2BLNUe/aXp88zUK89CfX5J5XqLvdFyQq5OXP8XJ4aoZAWWz9kbm9leAiBk9TIXbKbK9abL8EHILdV/PNSwIT7Qgj7LeBiMs/4CNGVCMI4gDfQ6pQyeNkYljCflG5PCBgqoYIIibzXYQrHRF1iSRq2G2WQjpeb3f5I02+D1gYuczgiQqG8ZRC6fw7I0+BArpK7ZOFLsVVC0kSDe3divrAz7yYlfDOGEN8gXBeadd1eVomlvncsiYRQeE4An7t3UfTr8mCRlcGqW9ksaTZIMG133e8ejpjw9u3MG9dFiAmVNr79ErtJJdXdFEvkmxaqqmql0qDn4F9jQZgbEwsJIc5opBbjPsvd3vCwXq+PNvvtZkoJx3yhE26f//XFS5jPeN5kB/YWxFGaaooyukELfesiPLpwCber1dnV/c7zzPPX29Vt97vJFGGIvWXQwktEhLnz6uzsbPVBJ5fLpe6tVqsPXLs2SL7WDNlYF0t4H/IBHXXQb10FsLP7Th1fffPNDgKs/aUzFcCQCO+tYsDZO2jYnXP4evUnW7/X8/PzP+LQsHN7OoCp3Kcff/rppIT3dcDZWUx4hF5Xzy2r8fX8lfm9IjbhDy9vjBtbaIRAzoy8hLkqBayitSVv6y05U8eZK1c28ByVai/fTGcZEsKPP56EcNbQag791he6Uc/ZfnPzV65gC0rF79/kpgNICZ2syEn4liW8h34rXZcmxFfz88c1nGb/ODclCxqETkbkI9yusoT7aOQ5Slg9Mnr+PP+QmLBVnhrg5IQ5FhAGRPRrDddTNTzqz38ji/DuL9OaoiyhwzTlIrwza9KRlZBBfPB3snNwvmUopoT7q2ZCHBBzbGv1Le569Mtdp4Q07oSzFp0jwnsW7nvQ2P/4b2LCKSWk4RCa3AwSInxhIVw92j+f1QGDXsyNhtAGWIWE8jYmvMOkAtWaXpCZqII9bcIHNsJV+Es7uH1V2Kc/r+qLcJLLSBEQ2gAJIc5LV3PC0lvShS7C4t+mGCkmJtRXYfWOQQjH38FpThVmpfu4XQeU1LPLRKib8MiYjavwl3YwcfU+6nUEFuWvOuDOweklItQT0irjUk2EZA+8X/1NX4S14w8uEaHuZqrbLCEM5vos1Xf5ZVrBX7ty5fIQ/qRTnbNhEUWLzgMdHYsWemt785eG8P65DrV63xT4cTzE70lGOqQl7WJ2ZmbmoylrRpe9YONB+JOxPYKGMgjP2ZwGJ6RdOkeL77IzkYqbcH/WmJWIwiDEmTcp3KDtb4peXpKeLkYLaDOjC2HuLRPo8R7eIMS7J5m8hz8b0Dm6dho1oBXRmZBNtqt3rG0PmHIiSNvIAQrYzaxHbsIZy0R1IjQ8zCxTEaWE1W209TNCftOYoztRw2F5EHZMHsZU1aaEpE6jF0z3FeOwsuLvEbsZInfCzss54S27Hdo2fmYQvkAxqPMTITxkrn3GYY7OmFeixYZzLzP/pCY0l+xpXkqqiXrIp9kaTEjjYUIvwjeZzMv/ISBH5mK2C+EfdEcBEtKYmNA0TU2Er9HVXWTE1bf3Lf7HTogaDAtKa2dRg1G5EJI7EIARV8/vWR2ssw2rvxqEtb3YmHAM4fOy42VBGyH0NL8ZcxQnpDGRC+FreA/Cc7dbEGyER6ZFKO1EnZCyWnYmBI7GlY8lfEEJJUbRJ6SMXAm9tG+N+HeM2lpMElJGExGSKzMdo8Adm4TU0ESEePckd1jAuCSkVJMRznYURVlRawxgXBJSqslm6S//Kw20ivlOvHjNUdbV+Ces/vYensctsnyxSUipghNW//j1PfpCAguoHsbNhEEJ//jHb0XMZz6fu5SLmwmZhchPWE6/f/+efuuJBRR7wn+iBrIpAOFKWmRkmqSC8O+ogWwKQNh0I9S6gvDqo/F/c7qamNBYhyr8FuKHsSNc9k/YMBEaRhRXwA9f/wkJqRFb6H7o2BHO+Cfsmgl1RDWNCGMXEEMgBIxAoogJP+H5o2cHzAeRPRhT1jljE6WxvS+EEAsT/swzTdfWTiji4snamo/e62t+dy/+CduehP/iIpSK+jZycb0oeROegd4n3L3tWvZP2PIi5AkX2QOKiIa84Znrod4nvL3DIGS+iC+OJIYQRguhw2PD7AZB5BoyRQwEGICwZxC2+gMrocA1AILIOWSCuPh5EEC6EAMRprsjGyFf7o0QT044h4wQ93h7T0zYZwgbm5qVkDP3hoi1Gu+QISLsfRpkdzYRYZl9gwl5c+/sRlGSirxD9td7QsKhAVWR2zZC3tx7cb3mo/aIe58EypiWJyBMs0kqIeTMvaHbAPOu+DnXoPXegYqx/gmNpaey22FCyJd7I794Ct0ND6LROxCiX0LDuWgjIVWxEfKMAQ85m+VDZHsHQfRLeEgJW0NBsRN+ww1IgsY4RHPvAIgTEO6yB/HohONz76w+ZPDyFCJ6Z21Mb4To26H6JRxRqHRXEAY2wvG5N8ilaWSDg/a+Ku6vt5OWfRLWNZbpULMSjg8X2c9rRmTLbtS8reKvdxiEhtUqKTZ26IQc4WLRtJYWxwzZX+9wCQV2p6ETxrVUE4RQEtgdPyWMad2bn5BuCdExbU07YUzr3vyEKhMO6ZFYLGFM6978hHSSwnAoyBUbYUzr3vyERnhowLd2G8a07s1PaHGeqo1Q+CBqIpv8EVKjVdC5xDTFMQjjWffmJzQWHno7tBNy5N5TVkBCCb2lhSmD8OdAo8guLoJ85ez0dGPj9PSMvI2CkO6XtEP0npbADUKuurcF7uzg4cnx3eKOrmLx7vHJw4OzcDCX/RDS8EBOnm3YCf2Fi+zi2bt1CTChO49qROg1AJbW351NDumLkO7qW/hhmmU7oY9wsZjd2JN2iirCKdZ+PF7f2/v997299eOnqAG1S3sb2QkhAxHicMi8p4S8uXd28XSvtgMoiju1472DU7z2kNAiPH23d1zbKQLKndre6USWDEZIzsCi740Tobly78WZh3cBHkA4fniadR4/aD59eFxE3Z4+nAnO6IewrBNVyDH9op2QJ/c+24PW2SmuH7jQGZQzB+tFWBAu7gW+Rd4XIV13pGFgJ+TJvdegXY4BHs8AF7PvjtE/mCqhRBr06iJDyONM16BJ+LMf4HGB0f1eHaVa9kGo14BJODSuYzCEHM40e/rOr39cnHkX7MJFQEJ6EHvbTsiVewcY7ATe1Aehvqlv6ceU63UMljCOuTc3oZ7DkHBoGJUljGPu7Z9QPxJSD5AsYbDc+yIVgLCiP3tXcSD0nXtfuJb5CfVl16ItDp4mjqUa34QSbRnYCeNXqpnxTUjDIb10wRLGse7NTUjCX6tPW8ilCxNhDOve/IRpczikly5MhDGse3MT6jwN2kLmrYmQ6xbFqYqfkFSe0sYJyU0HwviFC35CkmhXjEfRkx2jiXAudoTL3ITDrVtQW0aLTFoaTK9O/Ore/PXSN7dvP3v2PYsjZEDLs/8zPZovfrk3P+E/b9/OZP5lanoGWjLmh+/FL/fm3+PfKhZrUp214QpqGjXRKetYMQwX87zPPyyj75DUNcAjE5wGOjqprpYVGQifSRW/y6SfjiNDp+ArIB6K+JuGla7+5B+FnH412moY50DOxc3VLH/iAQYP+JfJKf/kaRWSOpKG5IEx+lNkQFOfPkMmF5+zMbDm7ScMwEkIwCxHyCr6SUmDel2q97sphUKjplG/gZ/GETMjzr+yWo4uKIsUuFdSVamONZA2FVm0NKGHdeRexQlxPpMDRIpCredx9u9WJZ1utdKtAeFppcqkSdOb8OHIMUL84GwOH/4ny5jRC1BuN3vtw6a8W9mqAG2NeqkUaNo9LKd6W7jpkByOnOv8+6MP4qD/fEgPNySE6PEwrojwg4D/WUk1yispBT0DVoFNSgo2lVPG0s3lXs9Fr5TOB6gUdiVCzLCfkhKRgE1SKA9xiRUwVHhN3NgKTzbFhc2BFHkg2d3NxkHIYaKFJPCRudKSRAD+LjkyaPSn0d+WZWZUgai4kJlnHBFg+odli1KOzyCT0aBZMR+lgUT+xsUBBeSfQFEjJEqUKFGiRIkSJUqUKFGiRIkSJUoUSP8PSz8TIBoLLcQAAAAASUVORK5CYII=" alt="" />
                                </div>
                            ) : (
                                <>
                                    {cart?.map((item: any, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <img
                                                        src={item.image}
                                                        className="w-[100px] rounded-sm shadow-md"
                                                    />
                                                </td>
                                                <td>{item.nameProduct}</td>
                                                <td className="text-[#b1c23c] font-semibold">
                                                    {VND.format(item.price)}
                                                </td>
                                                <td>
                                                    <div className="px-3">
                                                        <button
                                                            className=" border-2 px-2"
                                                            onClick={() =>
                                                                handleDecrease(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            -
                                                        </button>
                                                        {item.quantity}
                                                        <button
                                                            className=" border-2 px-2"
                                                            onClick={() =>
                                                                handleIncrease(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="text-[#b1c23c] font-semibold">
                                                    {VND.format(
                                                        item.price *
                                                        item.quantity
                                                    )}
                                                </td>
                                                <td
                                                    className="cursor-pointer "
                                                    onClick={() =>
                                                        handleDeleteCart(
                                                            item.cartId
                                                        )
                                                    }
                                                >
                                                    X
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            )}

                            <tr>
                                <td colSpan={2}>
                                    Tổng tiền:{" "}
                                    <span className="text-[#b1c23c] font-semibold">
                                        {VND.format(total)}
                                    </span>
                                </td>
                                <td colSpan={5}>
                                    <button
                                        className="ml-[75%] bg-[#343a40] text-white rounded-md p-2"
                                        onClick={handleShow}
                                    >
                                        Thanh toán
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr className="w-[90%] m-auto" />
                    <div className="absolute top-1 text-[#b1c23c] font-extrabold ml-[87%]">
                        {cart?.length}
                    </div>
                </div>
            </div>
        </div>
    );
}
