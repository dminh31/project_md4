import db from "../util/database"
async function getCartByUserId(userId:number) {
    try {
        const [result] = await db.execute("select * from cart join products on cart.productId = products.productId join categories on products.cateId = categories.cateId where userId = ?", [userId])
        return result
    } catch (error) {
        console.log(error)
    }
}
async function checkProductInCart(productId:number, userId:any) {
    try {
        const [result]:any = await db.execute("select * from cart where productId = ? and userId = ?", [productId, userId])
        return result[0]
    } catch (error) {
        console.log(error)
    }
}
async function addNewProductToCart(newProduct:any, userId:any) {
    try {
        const [result]:any = await db.execute("insert into cart (userId, productId, quantity) values (?, ?, 1)", [userId, newProduct.productId])
        return result.insertId
    } catch (error) {
        console.log(error)
    }
}
async function updatePlusQuantity(productId:number, userId:any) {
    try {
        const [result]:any = await db.execute("update cart set quantity = quantity + 1 where productId = ? and userId = ?", [productId, userId])
        return result.insertId;
    } catch (error) {
        console.log(error)
    }
}

async function deleteCartSQL(id:number) {
    try {
        const [result]:any = await db.execute("delete from cart where cartId = ?", [
            id,
        ]);
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

async function getCartQuantityId(id:number) {
    try {
        const [result]:any = await db.execute("select * from cart where cartId = ?", [id])
        return result[0]
    } catch (error) {
        console.log(error)
    }
}

async function deleteCartByUserId(userId:number) {
    try {
        const [result] = await db.execute("delete from cart where userId = ?", [
            userId,
        ]);
        return result;
    } catch (error) {
        console.log();
    }
}
async function increSQL(id:number, type:any) {
    try {
        if (type == "incre") {
            const [result]:any = await db.execute(
                "update cart set quantity = quantity + 1 where cartId = ?",
                [id]
            );
            return result.insertId;
        } else {
            const [result]:any = await db.execute(
                "update cart set quantity = quantity - 1 where cartId = ?",
                [id]
            );
            return result.insertId;
        }

    } catch (error) {
        console.log(error);
    }
}

export  {
    getCartByUserId,
    checkProductInCart,
    addNewProductToCart,
    updatePlusQuantity,
    deleteCartSQL,
    increSQL,
    deleteCartByUserId,
    getCartQuantityId
}