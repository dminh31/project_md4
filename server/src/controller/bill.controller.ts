import { Request, Response } from "express";
import {
    createBillMySql,
    getBillByAdminSql,
    getBillsMySql,
    updateStatus,
    updateStocksProduct,
} from "../service/bill.service";
import { getProductInBillMySql } from "../service/bill_detail.service";

async function createBill(req: Request, res: Response) {
    const { userId, address, phone, total } = req.body;
    try {
        const newIdBill = await createBillMySql(userId, address, phone, total);
        res.status(201).json({
            newIdBill,
        });
    } catch (error) {
        console.log(error);
    }
}

async function getBills(req: Request, res: Response) {
    const { userId } = req.params;
    try {
        const bills = await getBillsMySql(Number(userId));
        res.status(200).json({
            bills,
        });
    } catch (error) {
        console.log(error);
    }
}

async function getBillByAdmin(req: Request, res: Response) {
    try {
        const bills = await getBillByAdminSql();
        res.status(200).json({
            bills,
        });
    } catch (error) {
        console.log(error);
    }
}

async function updateChangeStatus(req: Request, res: Response) {
    try {
        const { updateStatusS } = req.params;
        const { status } = req.body;
        const productInOrder:any = await getProductInBillMySql(updateStatusS);
        const changeStatus = await updateStatus(Number(updateStatusS), status);
        if (status == "Xác nhận") {
            await Promise.all(
                productInOrder?.map(
                    async (product: {
                        productId: number;
                        quantity: number;
                    }) => {
                        await updateStocksProduct(
                            product.productId,
                            product.quantity
                        );
                    }
                )
            );
        }
        const users = await getBillByAdminSql();
        res.status(200).json({ message: "Change Oke", users });
    } catch (error) {
        console.log(error);
    }
}

export { createBill, getBills, getBillByAdmin, updateChangeStatus };
