import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import publicAxios from '../../config/publicAxios'
import privateAxios from '../../config/privateAxios'
import { failedNoti, successNoti } from "../utils/noti";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Admin.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import FormData from 'form-data';
import { RiDeleteBin2Line } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";

interface Products {
    nameProduct: string;
    price: number,
    stock: number,
    cateId: number,
    image: string,
    description: string,
    productId: number
}
export default function AdminProduct() {
    const [preview, setPreview] = useState(null || "");
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [product, setProduct] = useState<Products[]>([]);
    const [categories, setCategories] = useState([])
    const [search, setSearch] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    console.log(show)
    const handleShow = () => {
        setShow(true);
    };

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    const [newProduct, setNewProduct] = useState({
        nameProduct: "",
        price: 0,
        stock: 0,
        cateId: "",
        image: null,
        description: "",
        productId: ""
    });

    const handleGetProducts = async () => {
        try {
            const response = await publicAxios.get("/api/v1/products");
            setProduct(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetCategories = async () => {
        try {
            const response = await publicAxios.get("/api/v1/categories");
            setCategories(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetCategories(),
            handleGetProducts()
    }, [])

    const handleAddMedia = (event: any) => {
        setSelectedMedia(event.target.files[0]);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event: any) {
            setPreview(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleGetValue = (e: any) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleAdd = async () => {
        try {
            const formData = new FormData();
            formData.append("file", selectedMedia);
            formData.append("upload_preset", "project-md3");
            const [uploadMedia] = await Promise.all([
                axios.post(
                    "https://api.cloudinary.com/v1_1/dqujxh3uc/image/upload",
                    formData
                ),
            ]);
            const media = uploadMedia.data.secure_url;
            const response = await privateAxios.post("/api/v1/products", {
                ...newProduct,
                image: media,
            });
            successNoti(response.data.message);
            setProduct(response.data.products);
            setNewProduct({
                nameProduct: "",
                price: 0,
                stock: 0,
                cateId: "",
                image: null,
                description: "",
                productId: ""
            })
            setPreview(null || "")
            setShow(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (item: any) => {
        setNewProduct(item);
        setPreview(item.image);
        setShow(true);
    };

    const handleSave = async () => {
        try {
            if (!selectedMedia) {
                const response = await privateAxios.put(
                    `/api/v1/product/${newProduct.productId}`,
                    newProduct
                );
                setProduct(response.data.products);
                setNewProduct({
                    nameProduct: "",
                    price: 0,
                    stock: 0,
                    cateId: "",
                    image: null,
                    description: "",
                    productId: ""
                })
                setPreview(null || "")
                handleClose()
                return;
            }

            const formData = new FormData();
            formData.append("file", selectedMedia);
            formData.append("upload_preset", "project-md3");
            const [uploadMedia] = await Promise.all([
                axios.post(
                    "https://api.cloudinary.com/v1_1/dqujxh3uc/image/upload",
                    formData
                ),
            ]);
            const media = uploadMedia.data.secure_url;
            const response = await privateAxios.put(
                `/api/v1/product/${newProduct.productId}`,
                { ...newProduct, image: media }
            );
            
            setProduct(response.data.products);
            setNewProduct({
                nameProduct: "",
                price: 0,
                stock: 0,
                cateId: "",
                image: null,
                description: "",
                productId: ""
            })
            setPreview(null || "")
            handleClose()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const res = await privateAxios.delete(`/api/v1/product/${id}`)
            successNoti(res.data.message)
            setProduct(res.data.products)
        } catch (error) {
            console.log(error)
        }
    };

    const handleSearch = async () => {
        try {
            const response = await publicAxios.get(
                `/api/v1/products/search?key=${search}`
            );
            console.log(response)
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const endIndex = currentPage * itemsPerPage;
    const startIndex = endIndex - itemsPerPage;
    const displayedProducts = product.slice(startIndex, endIndex);
    const onPageChange = (page: number) => {
        setCurrentPage(page);
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
                    <button onClick={handleLogOut}>Log out</button>
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
                <Button
                    variant="primary"
                    onClick={handleShow}
                    className="bg-slate-500 text-[15px]"
                >
                    Thêm sản phẩm
                </Button>
                <input
                    type="text"
                    onChange={(e) => setSearch(e.target.value)}
                    className="ml-[200px]"
                />
                <button onClick={handleSearch}><CiSearch size={20} /></button>

                <Modal show={show} onHide={handleClose} className="h-[110vh]">
                    <Modal.Header closeButton>
                        <Modal.Title>Thêm sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Tên sản phẩm:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                name="nameProduct"
                                placeholder="Nhập tên san pham"
                                value={newProduct.nameProduct}
                                onChange={handleGetValue}
                            // onChange={(e) => setAddress(e.target.value)}
                            />{" "}
                            <br />
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="cateId"
                            >
                                Loại sản phẩm:
                            </label>
                            <select name="cateId" onChange={handleGetValue} value={newProduct.cateId}>
                                <option value="">Cho loai san pham</option>
                                {categories.map((category: any) => (
                                    <option value={category.cateId}>
                                        {category.nameCate}
                                    </option>
                                ))}
                            </select> <br />
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2 cursor-pointer"
                                htmlFor="image"
                            >
                                Ảnh sản phẩm:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="image"
                                type="file"
                                name="image"
                                onChange={handleAddMedia}
                                hidden
                            />
                            <img src={preview} alt="" width={100} height={100} /><br />
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="price"
                            >
                                Giá:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price"
                                type="text"
                                name="price"
                                placeholder="Nhập số điện thoại"
                                value={newProduct.price}
                                onChange={handleGetValue}
                            />{" "}
                            <br />
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="stock"
                            >
                                Số lượng:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="stock"
                                type="text"
                                name="stock"
                                placeholder="Nhập số điện thoại"
                                value={newProduct.stock}
                                onChange={handleGetValue}
                            />{" "}
                            <br />
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="description"
                            >
                                Mô tả:
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description"
                                type="text"
                                name="description"
                                placeholder="Nhập mô tả sản phẩm"
                                value={newProduct.description}
                                onChange={handleGetValue}
                            />{" "}
                            <br />
                        </div>
                    </Modal.Body>
                    {
                        <Modal.Footer>
                            <Button variant="primary" onClick={newProduct.productId ? handleSave : handleAdd} className="bg-slate-500">
                                {newProduct.productId ? "Save" : "Add"}
                            </Button>
                        </Modal.Footer>
                    }
                </Modal>

                <div className="card p-0 g-col-8 shadow border-0 h-[600px] w-[81vw] mt-2">
                    <div className="card-header">
                        <h5 className="mb-0 title text-xl">Danh Sách Sản Phẩm</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover table-nowrap">
                            <thead className="thead-light ">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Ảnh</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Chức năng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedProducts?.map((item: Products, index: number) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.productId}</td>
                                            <td>
                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    className="w-[100px] h-[120px]"
                                                />

                                            </td>
                                            <td>{item.nameProduct}</td>

                                            <td>{VND.format(item.price)}</td>
                                            <td>{item.stock}</td>
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
                                                    onClick={() => handleDelete(item.productId)}
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
                <Pagination
                    current={currentPage}
                    onChange={onPageChange}
                    pageSize={itemsPerPage}
                    total={product.length}
                    className="text-center"
                />
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
                <span>© 2022 Fresh Garden</span>
            </footer>
        </div>
    );
}
