import { Request, Response } from "express";
import { addUser, checkUserByEmail } from "../service/user.service";
import argon from "argon2";
import {
    getAllUsers,
    getUserById,
    updateStatus,
} from "../service/user.service";
import { transporter } from "../util/nodeMailer";
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function register(req: Request, res: Response) {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await argon.hash(password);

        const newUser = await addUser(username, hashedPassword, email);
        if (!newUser) {
            return res.status(500).json({
                message: "Server loi",
            });
        }
        res.status(201).json({
            message: "Đăng ký thành công",
        });
    } catch (error) {
        console.log(error);
    }
}

async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const findUser = await checkUserByEmail(email);
        if (!findUser) {
            return res
                .status(400)
                .json({ message: "Email hoặc mật khẩu không đúng" });
        }
        if (findUser.status_user == 1) {
            return res.status(400).json({ message: "Tài khoản bị khóa" });
        }

        const checkPassowrd = await argon.verify(findUser.password, password);
        console.log(checkPassowrd);
        if (!checkPassowrd) {
            return res
                .status(400)
                .json({ message: "Email hoặc mật khẩu không đúng" });
        }

        const token = jwt.sign(
            { id: findUser.id, role: findUser.role },
            process.env.SECRET_KEY
        );
        res.status(200).json({
            message: "Đăng nhập thành công",
            token,
            currentUser: findUser,
        });
    } catch (error) {
        console.log(error);
    }
}

async function getUsers(req: Request, res: Response) {
    const users = await getAllUsers();
    res.status(200).json({
        users,
        message: "Ban la admin",
    });
}

async function updateStatusUser(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        const update = !user.status_user;
        const updateUser = await updateStatus(id, Number(update));
        const users = await getAllUsers();
        res.status(200).json({
            message: "Update thanh cong",
            users,
        });
    } catch (error) {
        console.log(error);
    }
}

async function emailMessage(req: Request, res: Response) {
    const { email } = req.body;
    const mailOptions = {
        from: transporter.options.auth.user,
        to: email,
        subject: "Fresh Garden - Mỹ Đình",
        text: `Cảm ơn quý khách đã đặt hàng!!! Sản phẩm sẽ được giao sau ít giờ nữa. Chúc quý khách ngon miệng`,
    };
      const result = await transporter.sendMail(mailOptions);
    res.json(result);
}

export { register, login, getUsers, updateStatusUser, emailMessage };
