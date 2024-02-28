import React, { useState } from "react";
import {
    MDBFooter,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
} from "mdb-react-ui-kit";
// import "@fortawesome/fontawesome-free/css/all.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import bg from "./../../assets/images/bg.jpg";
import publicAxios from "../../config/publicAxios";

export default function Footer() {
    const [valueInput, setValueInput] = useState<string>("");
    const handleSubmit = async () => {
        try {
            const res = await publicAxios.post("/api/v1/emailmess", { email: valueInput })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })

        } catch (error) {
            console.log(error)
        }
        setValueInput("")
    }
    return (
        <div className="mt-5">
            <MDBFooter
                style={{ backgroundImage: `url(${bg})` }}
                className="text-center text-lg-start text-mute text-white"
            >
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom text-white">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <a href="" className="me-4 text-reset">
                            <MDBIcon fab icon="facebook-f" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <MDBIcon fab icon="twitter" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <MDBIcon fab icon="google" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <MDBIcon fab icon="instagram" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <MDBIcon fab icon="linkedin" />
                        </a>
                        <a href="" className="me-4 text-reset">
                            <MDBIcon fab icon="github" />
                        </a>
                    </div>
                </section>

                <section className="">
                    <MDBContainer className="text-center text-md-start mt-5">
                        <MDBRow className="mt-3">
                            <MDBCol
                                md="3"
                                lg="4"
                                xl="3"
                                className="mx-auto mb-4"
                            >
                                <h6 className="text-uppercase fw-bold mb-4 text-[#b1c23c]">
                                    <MDBIcon
                                        icon="gem"
                                        className="me-3 text-white "
                                    />
                                    Công ty TNHH PHD
                                </h6>
                                <p>
                                    Mã số doanh nghiệp: 0103833363 Do Sở Kế
                                    hoạch - Đầu tư Hà Nội cấp ngày 14/05/2009.
                                </p>
                            </MDBCol>

                            <MDBCol
                                md="2"
                                lg="2"
                                xl="2"
                                className="mx-auto mb-4"
                            >
                                <label className="fw-bold mb-4 text-[#b1c23c]">
                                    ĐĂNG KÍ NHẬN TIN{" "}
                                </label>
                                <input
                                    type="text"
                                    className="w-[300px] outline-none px-3 text-black"
                                    placeholder="Nhập Email Của Bạn"
                                    name="email"
                                    value={valueInput}
                                    onChange={(e) => setValueInput(e.target.value)}
                                />
                                <button className="w-[150px] bg-black mt-2 p-2" onClick={handleSubmit}>
                                    Đăng kí
                                </button>
                            </MDBCol>

                            <MDBCol
                                md="4"
                                lg="3"
                                xl="3"
                                className="mx-auto mb-md-0 mb-4"
                            >
                                <h6 className="text-uppercase fw-bold mb-4 text-[#b1c23c]">
                                    Contact
                                </h6>
                                <p>
                                    <MDBIcon icon="home" className="me-2" />
                                    46 phố An Dương, phường Yên Phụ, quận Tây
                                    Hồ, Thành phố Hà Nội.
                                </p>
                                <p>
                                    <MDBIcon icon="envelope" className="me-3" />
                                    cskh@freshgarden.vn
                                </p>
                                <p>
                                    <MDBIcon icon="phone" className="me-3" />{" "}
                                    024 3856 3856.
                                </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>

                <div
                    className="text-center p-4"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                >
                    © 2021 No Copyright:
                    <a
                        className="text-reset fw-bold"
                        href="https://mdbootstrap.com/"
                    >
                        Fresh Garden
                    </a>
                </div>
            </MDBFooter>
        </div>
    );
}
