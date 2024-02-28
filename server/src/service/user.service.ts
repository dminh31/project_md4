import database from "../util/database"
import dotenv from "dotenv"
dotenv.config()
async function getAllUsers() {
    try {
        const [user] = await database.execute("select * from users");
        return user;
    } catch (error) {
        console.log(error);
    }
}
async function getUserById(id:any) {
    try {
        const [findUser]:any = await database.execute("select * from users where userId = ?", [
            id,
        ]);
        return findUser[0];
    } catch (error) {
        console.log(error);
    }
}
async function checkUserByEmail(email:any) {
    try {
        const [findUser]:any = await database.execute("select * from users where email = ?", [
            email,
        ]);
        return findUser[0];
    } catch (error) {
        console.log(error);
    }
}
async function addUser(username:string, password:any, email:string) {
    try {
        const [result]:any = await database.execute("insert into users (username, password, email) values (?, ?, ?)",
            [username, password, email]);
        return result.insertId;
    } catch (error) {
        console.log(error);
    }
}

async function updateStatus(id:any, status:number) {
    try {
        const [result]:any = await database.execute("update users set status_user = ? where userId = ?", [status, id])
        return result.insertId;
    } catch (error) {
        console.log(error)
    }
}

export {
    getAllUsers,
    addUser,
    getUserById,
    checkUserByEmail,
    updateStatus,
}