import { emailMessage, login, register } from "../controller/user.controller";
import { checkEmailExist, checkEmpty } from "../middlewares/middlewares";
import { getUsers, updateStatusUser } from "../controller/user.controller";
import { verifyToken } from "../middlewares/middlewares"

export const userRouter = (app:any) => {
    app.get("/api/v1/users", verifyToken, getUsers);
    app.patch("/api/v1/user/:id", verifyToken, updateStatusUser)
    app.post("/api/v1/signup", checkEmpty, checkEmailExist, register);
    app.post("/api/v1/login", checkEmpty, login);
    app.post("/api/v1/emailmess",emailMessage)
};

