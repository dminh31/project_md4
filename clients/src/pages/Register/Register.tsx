import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { failedNoti, successNoti } from "../utils/noti";

export default function Register() {
    const [valueInput, setValueInput] = useState({
        username: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleGetValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValueInput({
            ...valueInput,
            [event.target.name]: event.target.value,
        });
    };

    const handleRegister = async () => {
        
        let err = 0
        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(valueInput.email)) {
            failedNoti("Chưa đúng định dạng email")
            err = 1
        }
        // if (!/^(0|\+84)\d{9,10}$/.test(newUser.phone)) {
        //     message.error("Chưa đúng định dạng SĐT")
        //     err = 1
        // }
        if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(valueInput.password)) {
            failedNoti("Chưa đúng định dạng mật khẩu")
            err = 1
        }

        if (err == 1) {
            return
        }
        try {
            const response = await axios.post(
                "http://localhost:8080/api/v1/signup",
                valueInput
            );
            successNoti(response.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (error: any) {
            failedNoti(error.response.data.message);
        }
    };

    return (
        <div className="w-full h-screen flex justify-around ">
            <div className="relative w-full h-full flex flex-col">
                <img
                    className="w-full h-screen object-cover"
                    src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/420633040_684968547163277_8843436104517301552_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeEnIXqVkVQNM8oaePx6aAmo9pXeb2xsOmH2ld5vbGw6Ye0ctPTa2AvD2z82zBqnnENKUWNsIumbzWTVt2Xpud0G&_nc_ohc=4Nb_VLIDApwAX-7XvaH&_nc_ht=scontent.fhan17-1.fna&oh=00_AfBZiBe4m3jtr-AtByTwgU_iRAkL7quWAVt_JL3GQdpHYQ&oe=65D709F0"
                />
            </div>

            <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-[30px] justify-between items-center  ">
                <h1 className=" text-xl text-[#060606] font-semibold mr-auto">
                    Interactive Brand
                </h1>

                <div className="w-full flex flex-col max-w-[500px] mt-2 ">
                    <div className=" w-full flex flex-col mb-2">
                        <h3 className="text-4xl font-semibold mb-3 ">
                            Register
                        </h3>
                        <p className="text-base mb-2">
                            You're Welcome! Please Enter Your Information
                            Details.
                        </p>
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full text-black py-4 my-3 bg-transparent border-b border-black outline-none focus:outline-none "
                        name="username"
                        value={valueInput.username}
                        onChange={handleGetValue}
                    />

                    <input
                        type="text"
                        placeholder="Email"
                        className="w-full text-black py-4 my-3 bg-transparent border-b border-black outline-none focus:outline-none "
                        name="email"
                        value={valueInput.email}
                        onChange={handleGetValue}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full text-black py-4 my-3 bg-transparent border-b border-black outline-none focus:outline-none "
                        name="password"
                        value={valueInput.password}
                        onChange={handleGetValue}
                    />

                    {/* <input
                                type="password"
                                placeholder='Confirm Password'
                                className='w-full text-black py-4 my-3 bg-transparent border-b border-black outline-none focus:outline-none '
                            /> */}
                </div>

                <div className="w-full flex justify-between items-center">
                    <div className="w-full flex ">
                        <input type="checkbox" className="w-4 h-4 mr-2 " />
                        <p className="text-sm ">Remember Me</p>
                    </div>
                    <Link to={"/"}>
                        <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">
                            Go To Home
                        </p>
                    </Link>
                </div>

                <div className="w-full flex flex-col my-4">
                    <button
                        className="w-full text-white my-2 bg-[#060606] font-semibold  rounded-md p-4 text-center flex items-center justify-center"
                        onClick={handleRegister}
                    >
                        Register
                    </button>
                </div>

                <div className="w-full flex items-center justify-center relative py-2 ">
                    <div className="w-full h-[1px] bg-black"></div>
                    {/* <p className='absolute text-lg text-black/80 bg-[#f5f5f5]'>or</p> */}
                </div>

                <div className="w-full flex items-center justify-center">
                    <p className="text-sm font-normal text-[#060606]">
                        Have a account?
                        <Link to={"/login"}>
                            <span className="font-semibold underline underline-offset-2 cursor-pointer ">
                                {" "}
                                Login for free
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
