import { Request, Response } from "express";
import {
    addProductSQL,
    deleteProductSQL,
    getAllProductsSQL,
    getProductByIdMySQL,
    getProductsByName,
    updateProductSQL,
} from "../service/product.service";

async function getAllProducts(req: Request, res: Response) {
    try {
        const products = await getAllProductsSQL();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
    }
}

async function addProduct(req: Request, res: Response) {
    try {
        const result = await addProductSQL(req.body);
        if (!result) {
            return res.status(500).json({
                message: "Co loi khi them san pham",
            });
        }
        const products = await getAllProductsSQL();
        res.status(200).json({
            message: "Thêm sản phẩm thành công",
            products,
        });
    } catch (error) {
        console.log(error);
    }
}

async function updateProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { nameProduct, price, image, stock, cateId, description } =
            req.body;
        const result = await updateProductSQL(
            nameProduct,
            price,
            image,
            stock,
            cateId,
            description,
            Number(id)
        );
        const products = await getAllProductsSQL();
        res.status(200).json({
            message: "Sua san pham thanh cong",
            products,
        });
    } catch (error) {
        console.log(error);
    }
}

async function deleteProduct(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await deleteProductSQL(Number(id));
        const products = await getAllProductsSQL();
        res.status(200).json({
            message: "Xóa sản phẩm thành công",
            products,
        });
    } catch (error) {
        console.log(error);
    }
}

async function getProductsBySearch(req: Request, res: Response) {
    const { key } = req.query;
    try {
        const result = await getProductsByName(String(key));
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
}

async function getProductById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await getProductByIdMySQL(Number(id));
        res.status(200).json({
            message: "Thành công",
            data: result,
        });
    } catch (error) {
        console.log(error);
    }
}
export {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProductsBySearch,
    getProductById,
};
