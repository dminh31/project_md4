import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import publicAxios from "../../config/publicAxios.js";
import { failedNoti, successNoti } from '../utils/noti.js';
import { getCart } from '../../store/redux-toolkitt/Cart.js';
import { useDispatch } from 'react-redux';
export interface Products {
    productId: number
    nameProduct: string
    stock: number
    image: string
    price: number
    description: string
    cateId: number
}
export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Products | null>(null);
    const [cart, setCart] = useState([])
    const [flag, setFlag] = useState(false)
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const handleGetCart = async () => {
        try {
            const res = await publicAxios.get(`/api/v1/cart/${currentUser.userId}`);
            setCart(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    useEffect(() => {
        handleGetCart()
    }, [flag]);

    const handleGetProduct = async () => {
        try {
            const response = await publicAxios.get(`/api/v1/products/${id}`);
            setProduct(response.data.data);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };
    const dispatch = useDispatch()
    const handleAddToCart = async (product: any) => {
        if (!currentUser.userId) {
            failedNoti("Đăng nhập để mua hàng")
            return;
        }
        try {
            const response = await publicAxios.post(`/api/v1/cart/${currentUser.userId}`, product)
            dispatch(getCart(currentUser?.userId))
            successNoti(response.data.message)
            setFlag(!flag)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetProduct();
    }, [id]);

    return (
        <>
            <div>
                {product && (
                    <div className='flex justify-evenly mt-3'>
                        <div>
                            <div className='border border-2 rounded-md shadow-md'>
                                <img src={product.image} alt="" width={500} />
                            </div>
                        </div>

                        <div className='flex flex-col justify-evenly w-[40%]'>
                            <h2 className='text-4xl'>{product.nameProduct}</h2>
                            <h2 className='text-2xl mt-2'>- Giá: {VND.format(product.price)}</h2>
                            <h2 className='text-2xl mt-2'>- Số lượng trong kho:{product.stock}</h2>
                            <h2 className='text-2xl mt-2 '>- Mô tả :{product.description}</h2>
                            <button className='border border-2 rounded-md shadow-md text-2xl text-white bg-green-500 p-2 mt-3' onClick={() => handleAddToCart(product)}>Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}