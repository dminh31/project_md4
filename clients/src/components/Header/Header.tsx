import React, { useEffect, useState } from "react";
import bg from "./../../assets/images/bg.jpg";
import logo from "./../../assets/images/logo.png";
import { FiPhoneCall } from "react-icons/fi";
import {
    AiOutlineMail,
    AiOutlineClose,
    AiOutlineUser,
    AiOutlineLogout,
} from "react-icons/ai";
import { ImSearch } from "react-icons/im";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { FaShoppingCart, FaBars, FaMapMarkerAlt } from "react-icons/fa";
import "./Header.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../store/redux-toolkitt/Cart";

export default function Header() {
    const [width, setWidth] = useState("");
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const openTab = () => {
        setWidth("280px");
    };
    const closeTab = () => {
        setWidth("0%");
    };
    const navigate = useNavigate();
    const clickLogo = () => {
        navigate("/");
    };
    const handleLogOut = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("idProduct");
        window.location.href = "/";
    };
    const cartUser = useSelector((state: any) => state.cartSliceder.cart);
    const dispatch = useDispatch();
    const changePage = () => {
        closeTab();
    };

    useEffect(() => {
        dispatch(getCart(user?.userId));
    }, []);

    return (
        <>
            <div className="sticky top-0 z-10">
                <div className="w-[100%] ">
                    <div
                        className="h-[60px] flex"
                        style={{ backgroundImage: `url(${bg})` }}
                    >
                        <img
                            src={logo}
                            className="w-[30%] cursor-pointer"
                            onClick={clickLogo}
                        />
                        <div className="flex w-[50%] h-full justify-around ml-[120px] text-m">
                            <div className="flex items-center  text-white">
                                <FiPhoneCall></FiPhoneCall>
                                <p className="m-3">024 3856 3856</p>
                            </div>
                            <div className="flex items-center text-white">
                                <AiOutlineMail></AiOutlineMail>
                                <p className="m-3">cskh@freshgarden.vn</p>
                            </div>
                            <div className="flex items-center text-white">
                                <FaMapMarkerAlt></FaMapMarkerAlt>
                                <p className="m-3">46 An Dương, Hà Nội</p>
                            </div>
                        </div>

                        <div className="flex items-center text-white text-xl">
                            {user.userId ? (
                                <Link to={"/cart"} className="m-[15px]">
                                    <span className="text-sm ml-5">
                                        {cartUser?.length}
                                    </span>
                                    <FaShoppingCart className="mt-[-30px]">
                                    </FaShoppingCart>
                                </Link>
                            ) : (
                                ""
                            )}
                            {user.userId ? (
                                <div onClick={handleLogOut}>
                                    <CiLogout className="m-2 cursor-pointer" />
                                </div>
                            ) : (
                                <Link to={"/login"}>
                                    {" "}
                                    <AiOutlineUser
                                        style={{ font: "20px", margin: "15px" }}
                                    ></AiOutlineUser>
                                </Link>
                            )}

                            <FaBars
                                className="m-3"
                                onClick={openTab}
                                style={{ cursor: "pointer" }}
                            ></FaBars>
                        </div>
                    </div>
                    <div style={{ width: width }} className="table_info">
                        <div className="text-4xl ml-[230px] mt-[20px]">
                            <BsFillArrowRightSquareFill
                                onClick={closeTab}
                                style={{ cursor: "pointer" }}
                            ></BsFillArrowRightSquareFill>
                        </div>
                        <div className="mt-5 ">
                            <p className="bg-[#b1c23c] w-full h-0.5"></p>
                            <ul className="py-[20px] ml-[20px]">
                                <NavLink to={"/"}>
                                    <li
                                        className="text-2xl py-[20px] hover:text-[#b1c23c]"
                                        onClick={changePage}
                                    >
                                        Trang chủ
                                    </li>
                                </NavLink>
                                <NavLink to={"/product"}>
                                    <li
                                        className="text-2xl py-[20px] hover:text-[#b1c23c]"
                                        onClick={changePage}
                                    >
                                        Sản phẩm
                                    </li>
                                </NavLink>
                                <NavLink to={"/introduction"}>
                                    <li
                                        className="text-2xl py-[20px] hover:text-[#b1c23c]"
                                        onClick={changePage}
                                    >
                                        Giới thiệu
                                    </li>
                                </NavLink>
                                <NavLink to={"/bill"}>
                                    <li
                                        className="text-2xl py-[20px] hover:text-[#b1c23c]"
                                        onClick={changePage}
                                    >
                                        Lịch sử mua hàng
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
