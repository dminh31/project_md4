import mysql2 from "mysql2"
import dotenv from "dotenv"
dotenv.config()
const connection = mysql2.createPool({
    database:process.env.DATABASE_NAME,
    user:process.env.USER_NAME,
    password:process.env.PASSWORD,
    host:process.env.LOCALHOST,
    port:Number(process.env.PORT_DB)
});

const database = connection.promise();

export default database;
