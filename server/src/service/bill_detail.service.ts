import db from "../util/database";
async function getProductInBillMySql(billId:any) {
    try {
        const [result] = await db.execute(
            "SELECT * FROM bills join bill_detail on bills.billId = bill_detail.bill_id join products on bill_detail.productId = products.productId where bills.billId = ?",
            [billId]
        );
        return result
    } catch (error) {
        console.log(error);
    }
}
async function createBillDetailMySql(billId:any, productId:number, quantity:number) {
    
    try {
        const [result] = await db.execute(
            "insert into bill_detail (bill_id, quantity, productId) values (?,?,?)",
            [billId, quantity, productId]
        );
        return result;
    } catch (error) {
        console.log(error);
    }
}


export {
    getProductInBillMySql,
    createBillDetailMySql,
};
