import { addProduct, deleteProduct, getAllProducts, getProductById, getProductsBySearch, updateProduct } from "../controller/product.controller";
import { verifyToken } from "../middlewares/middlewares"

export const productRouter = (app:any) => {
    app.get("/api/v1/products",  getAllProducts);
    app.post("/api/v1/products", verifyToken, addProduct);
    app.put("/api/v1/product/:id", verifyToken, updateProduct)
    app.delete("/api/v1/product/:id", verifyToken, deleteProduct)
    app.get("/api/v1/products/search", getProductsBySearch);
    app.get("/api/v1/products/:id", getProductById);
}
