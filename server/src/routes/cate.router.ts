import { addCate, deleteCate, getAllCates, updateCate } from "../controller/cate.controller";
import { verifyToken } from "../middlewares/middlewares"

export const categoryRouter = (app:any) => {
    app.get("/api/v1/categories", getAllCates);
    app.post("/api/v1/categories", verifyToken, addCate)
    app.delete("/api/v1/categories/:id", verifyToken, deleteCate)
    app.put("/api/v1/categories/:id", verifyToken, updateCate)
}

