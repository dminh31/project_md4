import { Request, Response } from "express";
import { getCartByUserId, checkProductInCart, addNewProductToCart, updatePlusQuantity, deleteCartSQL, getCartQuantityId, increSQL, deleteCartByUserId } from "../service/cart.service";
async function getCart(req:Request, res:Response) {
    const { user_id } = req.params
    try {
        const cart = await getCartByUserId(Number(user_id))
        res.status(200).json(cart)
    } catch (error) {
        console.log(error)
    }
}

async function addToCart(req:Request, res:Response) {
    try {
        //Check xem sản phẩm đã có trong giỏ hàng hay chưa
        const check = await checkProductInCart(req.body.productId, req.params.user_id);
        if (!check) {
            // Nếu chưa có trong giỏ hàng thì thêm vào
            await addNewProductToCart(req.body, req.params.user_id);
            return res.status(201).json({
                message: "Thêm vào giỏ hàng thành công"
            })
        }
        // Nếu đã có trong giỏ hàng thì tăng số lượng
        // await updatePlusQuantity(req.body.productId, req.params.user_id);
        res.status(200).json({
            message: "Sản phẩm đã có trong giỏ hàng"
        })
    } catch (error) {
        console.log(error)
    }
}

async function deleteCart(req:Request, res:Response) {
    const { cartId } = req.params;
    try {
        const result = await deleteCartSQL(Number(cartId));
        res.status(200).json({
            message: "Xóa sản phẩm thành công",
        });
    } catch (error) {
        console.log(error);
    }
}

async function changeQuantity(req:Request, res:Response) {
    const { cartId, type } = req.body;
    try {
        const cart = await getCartQuantityId(cartId)
            const result = await increSQL(cartId, type);
            res.status(200).json({
                message: "tăng số lượng thành công",
            });
        
    } catch (error) {
        console.log(error);
    }
}

async function deleteCartPayment(req:Request, res:Response) {
    const { user_id } = req.params
    try {
        await deleteCartByUserId(Number(user_id))
        res.status(200).json({
            message: "Xoa gio hang thanh cong"
        })
    } catch (error) {
        console.log(error)
    }
}
export {
    getCart,
    addToCart,
    deleteCart,
    changeQuantity,
    deleteCartPayment
}