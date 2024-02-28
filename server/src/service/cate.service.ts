import db from "../util/database"


async function getAllCateSQL() {
    const [cates] = await db.execute("select * from categories");
    return cates;
}

async function addCateSQL(nameCate:string) {
    const [cate]:any = await db.execute("insert into categories (nameCate) values (?)", [nameCate]);
    return cate.insertId
}

async function deleteCateSQL(cateId:number) {
    const [cate]:any = await db.execute("delete from categories where cateId = ?", [cateId]);
    return cate.insertId
}

async function updateCateSQL(nameCate:string, cateId:number) {
    const [cate]:any = await db.execute("update categories set nameCate = ? where cateId = ?", [nameCate, cateId]);
    return cate.insertId
}

export  {
    getAllCateSQL,
    addCateSQL,
    deleteCateSQL,
    updateCateSQL
}