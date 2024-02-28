import { createBill, getBillByAdmin, getBills, updateChangeStatus } from "../controller/bill.controller"
import { verifyToken } from "../middlewares/middlewares"

const billRouter = (app:any) => {
    app.post("/api/v1/bills", createBill)
    app.get("/api/v1/bills/:userId", getBills)
    app.get("/api/v1/bills", getBillByAdmin)
    app.put("/api/v1/update/:updateStatusS", updateChangeStatus)
}
export {
    billRouter
}