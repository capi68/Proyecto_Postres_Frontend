import React from "react";
import NavBar from "../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home () {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <>
        <NavBar />
        <section className=" 
                    w-full 
                    min-h-screen 
                    bg-white
                    flex flex-col 
                    justify-center md:justify-evenly
                    items-center 
                    text-center "
        >
            {/*Title*/}
            <h1 className="
                    w-[80%]
                    text-2xl md:text-4xl 2xl:text-6xl 
                    font-Lora 
                    font-bold 
                    text-[var(--color-text)] 
                    mt-6 md:mt-2
                    mb-8 "
            >
                Endulza tu dia con nuestros Postres Artesanales!
            </h1>

            {/* Products promo*/}
            <div className=" 
                        flex flex-col md:flex-row
                        w-full md:w-[80%]
                        justify-center 
                        items-center md:items-start
                        gap-12 
                        mb-16"
            >

                <div className="
                            w-[80%] md:w-full
                            h-full 
                            text-start 
                            flex flex-col 
                            items-center
                            justify-evenly 
                            mb-4 md:mb-24"
                >
                    <p className=" 
                            text-[var(--color-text-light)] 
                            text-center 
                            text-md md:text-lg 
                            font-Lora 
                            mb-8"
                    >
                        Disfruta donde gustes nuestro combo estrella <br /> con un solo click
                    </p>
                    <p className="
                            text-2xl md:text-4xl 2xl:text-6xl
                            text-[var(--color-text)]  
                            font-bold 
                            font-Lora 
                            mb-8 
                            text-center"
                    >
                        Croissant bicolor de chocolate <br /> Y <br /> Un Macciato de la casa
                    </p>
                </div>
                <img src="/images/promo.png" alt="" className="w-60 md:w-80 h-60 md:h-80 border rounded-lg "/>
                
            </div>

            {/* images products carril */}
            <div className="w-full justify-center flex gap-6 mb-4">
                <span className="
                        w-16 md:w-24
                        flex
                        justify-center 
                        items-center
                        text-xs md:text-lg
                        font-bold  
                        font-Lora
                        text-[var(--color-text)]"
                >
                    y muchos mas...
                </span>

                <img src="/images/image-baklava-desktop.jpg" alt="" className="hidden md:block w-16 h-16 border rounded-lg " />
                <img src="/images/image-brownie-desktop.jpg" alt="" className="w-16 h-16 border rounded-lg " />
                <img src="/images/image-cake-desktop.jpg" alt="" className="w-16 h-16 border rounded-lg " />
                <img src="/images/image-macaron-desktop.jpg" alt="" className="hidden md:block w-16 h-16 border rounded-lg " />
                <img src="/images/image-meringue-desktop.jpg" alt="" className="w-16 h-16 border rounded-lg " />
                <img src="/images/image-panna-cotta-desktop.jpg" alt="" className="hidden md:block w-16 h-16 border rounded-lg " />
            </div>
            <button onClick={() => navigate("/products")}
                    className="
                        bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] 
                        text-white
                        px-8
                        py-3
                        rounded-lg
                        font-semibold
                        font-Josefin
                        mb-8"
            >
                Ver Catalogo
            </button>
        </section>
        </>
    )
}