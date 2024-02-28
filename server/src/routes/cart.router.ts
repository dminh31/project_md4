import { addToCart, changeQuantity, deleteCart, deleteCartPayment, getCart } from "../controller/cart.controller";

export const cartRouter = (app:any) => {
    app.get("/api/v1/cart/:user_id", getCart)
    app.post("/api/v1/cart/:user_id", addToCart)
    app.delete("/api/v1/cart/:cartId", deleteCart)
    app.patch("/api/v1/cart", changeQuantity);
    app.delete("/api/v1/carts/:user_id", deleteCartPayment)
}
