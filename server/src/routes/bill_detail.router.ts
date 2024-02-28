import { createBillDetail, getProductInBill } from "../controller/bill_detail.controller"

const billDetailRouter = (app:any) => {
    app.get("/api/v1/billDetail/:billId", getProductInBill)
    app.post("/api/v1/billDetail", createBillDetail)
}

export {
    billDetailRouter
}