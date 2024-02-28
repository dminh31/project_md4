import { Request, Response } from "express";
import { addCateSQL, deleteCateSQL, getAllCateSQL, updateCateSQL } from "../service/cate.service";

async function getAllCates(req:Request, res:Response) {
    try {
        const categories = await getAllCateSQL();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
    }
}

async function addCate(req:Request, res:Response) {
    try {
        const { nameCate } = req.body
        const result = await addCateSQL(nameCate)
        if (!result) {
            return res.status(500).json({
                message: "Them category that bai",
            });
        }
        const cates = await getAllCateSQL();
        res.status(200).json({
            message: "Thêm category thành công",
            cates,
        });
    } catch (error) {
        console.log(error)
    }
}

async function deleteCate(req:Request, res:Response) {
    const { id } = req.params
    const result = await deleteCateSQL(Number(id))
    const cates = await getAllCateSQL()
    res.status(200).json({
        message: "Xóa thành công",
        cates
    })
}

async function updateCate(req:Request, res:Response) {
    const { id } = req.params
    const { nameCate } = req.body
    const result = await updateCateSQL(nameCate, Number(id))
    const cates = await getAllCateSQL()
    res.status(200).json({
        message: "Cập nhật thành công",
        cates
    })
}

export {
    getAllCates,
    addCate,
    deleteCate,
    updateCate
}