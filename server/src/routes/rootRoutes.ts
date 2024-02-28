import express from "express"
import { userRouter } from "./user.router"
import { categoryRouter } from "./cate.router"
import { productRouter } from "./product.router"
import { cartRouter } from "./cart.router"
import { billDetailRouter } from "./bill_detail.router"
import { billRouter } from "./bill.router"
const rootRouter = (app:any) => {
     userRouter(app)
     categoryRouter(app)
     productRouter(app)
     cartRouter(app)
     billRouter(app)
     billDetailRouter(app)
}
export default rootRouter