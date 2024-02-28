import React, { useState } from "react";
import bg from "../../assets/images/bg.jpg";
import Slider from "react-slick";
import Banner from "../Banner/Banner"
// import Products from '../product/Products.jsx';
// import './Home.scss';


export default function Home() {
    const [images, setImages] = useState([
        {
            image: "https://theme.hstatic.net/200000411281/1000949882/14/home_client_image_1.png?v=260",
            title: "Flower Fruit",
            content:
                "Nhắc đến sinh nhật không thể không nhắc đến bánh kem Fresh Garden. Dù là người lớn hay trẻ nhỏ cũng sẽ say đắm vị ngọt dịu dàng trên từng miếng bánh.",
        },
        {
            image: "https://theme.hstatic.net/200000411281/1000949882/14/home_client_image_2.png?v=260",
            title: "Love Melody",
            content:
                "Mê mẩn mẫu bánh kem nhỏ xinh mà Fresh Garden mới ra mắt. Chiếc bánh quá tuyệt dành cho bữa tiệc hai người hay món quà bất ngờ dành tặng người thương nhân một ngày trời nắng đẹp.",
        },
        {
            image: "https://theme.hstatic.net/200000411281/1000949882/14/home_client_image_3.png?v=260",
            title: "Bánh tươi dừa và Macaron",
            content:
                "Với mình một bữa sáng ngọt ngào cùng người thương là khi có bánh ngon của Fresh Garden. Cả mình và người yêu đều là tín đồ trung thành của Bánh tươi mỗi ngày đó nha.",
        },
        {
            image: "https://theme.hstatic.net/200000411281/1000949882/14/home_client_image_4.png?v=260",
            title: "Macaron Delight",
            content:
                "Fresh Garden ra mắt bộ sưu tập bánh kem mới cũng được hơn một tháng rồi, mình đã có cơ hội thử loại bánh kem cốt chiffon mới toanh. Cốt mềm, thơm và vị thì tuyệt vời luôn nha.",
        },
    ]);

    const [product, setProduct] = useState([
        {
            id: 1,
            price: 380000,
            category: 1,
            nameProduct: "Bánh Kem Happy Halloween",
            productDetail: "",
            image: "https://product.hstatic.net/200000411281/product/ok_23-02_dcd005b050aa404ab9e636e2ae59288f_grande.png",
            decription: "",
            stocks: 50,
            quantity: "1",
        },
        {
            id: 2,
            nameProduct: "Bánh Kem Princess",
            price: 380000,
            quantity: "1",
            category: "1",
            stocks: 50,
            image: "https://firebasestorage.googleapis.com/v0/b/project-md2-92993.appspot.com/o/images%2F13-03_eee16cd2465944e9b27b82ac92f2271d_grande.png?alt=media&token=97bf7487-b05a-4ced-bf7c-844b51469b86",
        },
        // {
        //     "nameProduct": "Bánh Kem Forever Love",
        //     "price": 380000,
        //     "image": "https://firebasestorage.googleapis.com/v0/b/project-md2-92993.appspot.com/o/images%2F6_9e4ff52581b948ffbbd58d1c1e97d141_grande.png?alt=media&token=ebb266ab-0da5-4cf0-8dcc-d24792cae6b6",
        //     "quantity": "1",
        //     "category": "1",
        //     "id": 5,
        //     "stocks": 50
        // },
        {
            nameProduct: "Bánh Kem Macaron Delight",
            price: 380000,
            image: "https://firebasestorage.googleapis.com/v0/b/project-md2-92993.appspot.com/o/images%2F10_d7039cd288ac4c6a844771d4f448b4aa_grande.png?alt=media&token=dba397f7-cd81-4f27-928a-34ebff708c89",
            quantity: "1",
            category: "1",
            id: 8,
            stock: 50,
        },
        {
            nameProduct: "Bánh Passion Fruit Mousse",
            price: 390000,
            image: "https://product.hstatic.net/200000411281/product/6_9e4ff52581b948ffbbd58d1c1e97d141_grande.png",
            quantity: "1",
            category: "1",
            id: 4,
            stocks: 50,
        },
        {
            nameProduct: "Bánh Kem Sweet Heart 4",
            price: 150000,
            image: "https://firebasestorage.googleapis.com/v0/b/project-md2-92993.appspot.com/o/images%2F2-removebg-preview__1__ba51f7d4eaf74031877384148b2a7a9f_grande.png?alt=media&token=a3a84a7a-f870-4333-aa9d-949a9bf71014",
            quantity: "1",
            category: "1",
            id: 3,
            stocks: 50,
        },
    ]);
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const settingProduct = {
        infinite: true,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 4000,
    };
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return (
        <>
            <Banner />
            <div className="mb-3 ">
                <div
                    className="h-[650px] flex flex-col  items-center "
                    style={{ backgroundImage: `url(${bg})` }}
                >
                    <img
                        className="w-[100px] h-[100px] mt-5"
                        src="https://theme.hstatic.net/200000411281/1000949882/14/icon-title-home-featured-product.png?v=260"
                        alt=""
                    />
                    <div className="text-white mt-4 ">
                        <h2 className="text-center font-bold text-5xl">
                            Sản phẩm nổi bật
                        </h2>
                        <p className="mt-3 text-2xl text-center">
                            Cập nhật về những sản phẩm nổi bật nhất từ Fresh
                            Garden
                        </p>
                        <div>
                            <div className="truncate h-full w-[1300px] ">
                                <Slider {...settingProduct}>
                                    {product.map((item, index) => {
                                        return <div className='m-5' key={index}>
                                            <img src={item.image} />
                                            <h2 className='text-xl ml-6'>{item.nameProduct}</h2>
                                            <h2 className='ml-[110px] text-[#b1c23c]'>{VND.format(item.price)}</h2>
                                        </div>
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="mt-5 flex items-center flex-col">
                        <img
                            src="https://theme.hstatic.net/200000411281/1000949882/14/icon-title-home-about.png?v=260"
                            alt=""
                        />
                        <h2 className="text-center font-semibold text-5xl">
                            Câu chuyện Fresh Garden
                        </h2>
                        <p className="mt-3 text-2xl">
                            Fresh Garden là thương hiệu bánh Việt được xây dựng
                            từ tình yêu qua những thông điệp ngọt ngào trong mỗi
                            chiếc bánh.
                        </p>
                    </div>

                    <div className="flex justify-around items-center ">
                        <div className="w-[600px] h-[400px] bg-[#4B494E] px-[40px] py-[55px]  ">
                            <h2 className="font-semibold text-3xl text-white p-3 mt-8">
                                Câu chuyện về chiếc bánh tươi
                            </h2>
                            <p className="text-white p-3 text-center text-xl">
                                Hơn 12 năm không ngừng phát triển, Fresh Garden
                                - "Bánh tươi mỗi ngày" với sứ mệnh xuyên suốt
                                mang đến khách hàng những sản phẩm dinh dưỡng -
                                an toàn - tự nhiên tốt cho sức khỏe người dùng.
                            </p>
                        </div>

                        <div className="flex flex-col w-[400px] h-[400px] bg-[#b1c23c] ml-[-400px] mt-[200px]">
                            <img
                                className="w-[450px] h-[200px] object-cover ml-[100px] mt-[100px] "
                                src="https://theme.hstatic.net/200000411281/1000949882/14/ha_image.jpg?v=260"
                                alt=""
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col items-center mt-[100px]">
                            <img
                                src="https://theme.hstatic.net/200000411281/1000949882/14/icon-title-home-service.png?v=260"
                                alt=""
                            />
                            <h2 className="text-5xl font-semibold">
                                Dịch vụ nổi bật
                            </h2>
                        </div>

                        <div className="flex justify-around w-[90%] ml-[100px]">
                            <div className="px-0 py-[25px]">
                                <img
                                    className="w-[200px] h-[200px]"
                                    src="https://theme.hstatic.net/200000411281/1000949882/14/service_img_1.png?v=260"
                                    alt=""
                                />
                                <h4 className="text-3xl font-serif p-4 text-[#b1c23c]">
                                    Bánh tươi mỗi ngày
                                </h4>
                                <p className="w-[310px] p-4 text-xl">
                                    Sản phẩm được sản xuất trong ngày với nguyên
                                    liệu chất lượng và tươi mới
                                </p>
                            </div>
                            <div className="px-0 py-[25px]">
                                <img
                                    className="w-[200px] h-[200px]"
                                    src="https://theme.hstatic.net/200000411281/1000949882/14/service_img_2.png?v=260"
                                    alt=""
                                />
                                <h4 className="text-3xl font-serif p-4 text-[#b1c23c]">
                                    Đa dạng chọn lựa
                                </h4>
                                <p className="w-[310px] p-4 text-xl">
                                    Thế giới phong phú của bánh kem tươi, bánh
                                    mì, pizza, bánh ngọt...
                                </p>
                            </div>
                            <div className="px-0 py-[25px]">
                                <img
                                    className="w-[200px] h-[200px]"
                                    src="https://theme.hstatic.net/200000411281/1000949882/14/service_img_3.png?v=260"
                                    alt=""
                                />
                                <h4 className="text-3xl font-serif p-4 text-[#b1c23c]">
                                    Danh sách cửa hàng
                                </h4>
                                <p className="w-[310px] p-4 text-xl">
                                    Gần 100 cửa hàng lớn, phủ khắp các quận
                                    huyện nhằm đáp ứng nhu cầu mua sắm tiện lợi
                                </p>
                            </div>
                            <div className="px-0 py-[25px]">
                                <img
                                    className="w-[200px] h-[200px]"
                                    src="https://theme.hstatic.net/200000411281/1000949882/14/service_img_4.png?v=260"
                                    alt=""
                                />
                                <h4 className="text-3xl font-serif p-4 text-[#b1c23c]">
                                    Dịch vụ tận tâm
                                </h4>
                                <p className="w-[310px] p-4 text-xl">
                                    Sự tỉ mỉ, tận tâm và chuyên nghiệp luôn là
                                    huyết mạch trong phục vụ
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col items-center mt-10">
                            <img
                                src="https://theme.hstatic.net/200000411281/1000949882/14/icon-title-home-articles.png?v=260"
                                alt=""
                            />
                            <h5 className="text-5xl font-semibold">Tin tức</h5>
                            <p className="text-2xl mt-3 ">
                                Nơi Fresh Garden cập nhật thông tin mới nhất vê
                                sản phẩm, cửa hàng và ưu đãi
                            </p>
                        </div>
                        <div className="flex justify-around w-[90%] ml-[140px] mt-10">
                            <div className="w-[450px] ">
                                <img
                                    className="w-[300px] object-cover "
                                    src="https://file.hstatic.net/200000411281/article/cover_23333-01_584a3e3a11584187bce2822d1b9f0146.jpg"
                                    alt=""
                                />
                                <h4 className="w-[300px] text-2xl">
                                    Khám Phá Điều Bí Ẩn Ngọt Ngào Đêm Halloween
                                    Tại Fresh Garden
                                </h4>
                                <p className="w-[300px] text-xl">
                                    Vẫn là bánh kem cốt chiffon bồng bềnh ngọt
                                    ngào nhưng được khoác lên diện mạo ma mị
                                    và...
                                </p>
                            </div>
                            <div className="w-[450px]">
                                <img
                                    className="w-[350px] object-cover"
                                    src="https://file.hstatic.net/200000411281/article/bcbcbcvc-01_197f0fec099e485fb95862fee26c6316.jpg"
                                    alt=""
                                />
                                <h4 className="w-[300px] text-2xl">
                                    BST bánh kem chào mừng ngày Phụ nữ Việt Nam
                                </h4>
                                <p className="w-[300px] text-xl">
                                    Nếu một ngày bạn cảm thấy thật khó để nói ra
                                    lời yêu thương dành cho người phụ nữ bên
                                    cạnh...
                                </p>
                            </div>
                            <div className="w-[450px]">
                                <img
                                    className="w-[350px] object-cover"
                                    src="https://file.hstatic.net/200000411281/article/299849_31-8-den_trung_thu_7a66288cbeee4adc8bc14d4c3c3b985a.jpg"
                                    alt=""
                                />
                                <h4 className="w-[300px] text-2xl">
                                    Khám Phá Điều Bí Ẩn Ngọt Ngào Đêm Halloween
                                    Tại Fresh Garden
                                </h4>
                                <p className="w-[300px] text-xl">
                                    Tết trung thu theo âm lịch hằng năm.Đây là
                                    ngày lễ được các em nhỏ...
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="mt-[80px] flex flex-col items-center">
                            <img
                                src="https://theme.hstatic.net/200000411281/1000949882/14/icon-title-home-client.png?v=260"
                                alt=""
                            />
                            <h5 className="text-5xl ">
                                Khách hàng và Fresh Garden
                            </h5>
                            <p className="mt-3 text-2xl">
                                Nơi Fresh Garden lưu giữ những cảm nhận và phản
                                hồi của khách hàng
                            </p>
                        </div>

                        <div className="w-[650px] h-[680px] bg-[#4B494E] overflow-hidden ml-[450px] mt-10 rounded-3xl">
                            <Slider className="w-full" {...settings}>
                                {images.map((image, index) => (
                                    <div className="" key={index}>
                                        <img
                                            className="w-[480px] h-[300px] object-fill block ml-[90px] mt-[80px] rounded-2xl"
                                            src={image.image}
                                            alt={`Slide ${index + 1}`}
                                        />
                                        <h5 className="text-4xl text-white py-8 text-center">
                                            {image.title}
                                        </h5>
                                        <p className="w-[400px] text-white ml-[130px] text-xl">
                                            {image.content}
                                        </p>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
