import db from "../util/database"

async function getAllProductsSQL() {
    try {
        const [products] = await db.execute("select * from products");
        return products;
    } catch (error) {
        console.log(error);
    }
}
async function addProductSQL(newProduct:any) {
    const { nameProduct, price, image, stock, cateId, description } =
        newProduct;
    try {
        const [result]:any = await db.execute(
            "insert into products (nameProduct,image,price,stock,cateId,description) values (?,?,?,?,?,?)",
            [nameProduct, image, +price, +stock, +cateId, description]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

async function updateProductSQL(nameProduct:string, price:number, image:string, stock:number, cateId:number, description:string, productId:number) {
    // const { nameProduct, price, image, stock, cateId, description, productId } =
    //     newProduct;
    try {
        const [result]:any = await db.execute(
            "update products set nameProduct = ?, image = ?, price = ?, stock = ?, cateId = ?, description = ? where productId = ?",
            [nameProduct, image, +price, +stock, +cateId, description, productId]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

// export async function updateStocksProductSQL(productId:any, quantity:any) {
//     try {
//         const [result]:any = await db.execute(
//             "update products set stock = stock - ? where productId = ?",
//             [quantity, productId]
//         );
//         return result.insertId;
//     } catch (error) {
//         console.log(error);
//     }
// }

async function deleteProductSQL(productId:number) {
    try {
        const [result]:any = await db.execute(
            "delete from products where productId = ?",
            [productId]
        );
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

async function getProductsByName(name:string) {
    try {
        const [products] = await db.execute(
            `select * from products where nameProduct like '%${name}%'`
        );
        return products;
    } catch (error) {
        console.log(error);
    }
}

async function getProductByIdMySQL(id: number) {
    try {
      const [products]: any = await db.execute(
    "select * from products where productId = ? ",[id])
    return products[0];
    } catch (error) {
        console.log(error)
    }
}

export {
    getAllProductsSQL,
    addProductSQL,
    updateProductSQL,
    deleteProductSQL,
    getProductsByName,
    getProductByIdMySQL
}