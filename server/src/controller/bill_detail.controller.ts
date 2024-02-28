import { Request, Response } from "express";
import { createBillDetailMySql, getProductInBillMySql } from "../service/bill_detail.service";
// import { updateStocksProductSQL } from "../service/product.service";
async function getProductInBill(req:Request, res:Response) {
    const { billId } = req.params
    try {
        const products = await getProductInBillMySql(billId)
        res.status(200).json(products)
    } catch (error) {
        console.log(error)
    }
}

async function createBillDetail(req:Request, res:Response) {
    try {
        const { billId, cart } = req.body;
        await Promise.all(
            cart.map(async (product:any) => await createBillDetailMySql(billId, product.productId, product.quantity))
        )
        // await updateStocksProductSQL( cart.quantity,cart.productId)
        res.status(200).json({
            message: "Thành công"
        })
    } catch (error) {
        console.log(error)
    }
}

export {
    getProductInBill,
    createBillDetail
}