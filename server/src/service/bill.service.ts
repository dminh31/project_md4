import db from "../util/database";

async function createBillMySql(userId:number, address:string, phone:string, total:any) {

    try {
        const [result]:any = await db.execute("insert into bills (userId, address, phoneNumber,total, createdAt) values (?,?,?,?, CURRENT_TIMESTAMP())", [userId, address, phone, total]);
        return result.insertId
    } catch (error) {
        console.log(error)
    }
}

async function getBillsMySql(userId:number) {

    try {
        const [result] = await db.execute("select * from bills  where userId = ?", [userId]);
        return result
    } catch (error) {
        console.log(error)
    }
}

async function getBillByAdminSql() {

    try {
        const [result] = await db.execute("select * from bills join users on bills.userId = users.userId");
        return result
    } catch (error) {
        console.log(error)
    }
}

async function updateStatus(id:number, status:number) {
    try {
        const [result]:any = await db.execute("update bills set status = ? where billId = ?", [status, id])
        return result.insertId
    } catch (error) {
        console.log(error)
    }
};

async function updateStocksProduct(product_id:number, quantity:number) {
    try {
        const [result]:any = await db.execute(
            "update products set stock = stock - ? where productId = ?",
            [quantity, product_id]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

export {
    createBillMySql,
    getBillsMySql,
    getBillByAdminSql,
    updateStatus,
    updateStocksProduct
}