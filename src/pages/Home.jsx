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
                    relative 
                    w-full 
                    h-[100dvh] 
                    bg-[var(--color-bg)] 
                    flex flex-col 
                    justify-center 
                    items-center 
                    text-center "
        >
            
            <h1 className="text-4xl font-Lora font-bold text-[var(--color-text)] mb-4">
                Endulza tu dia con nuestros Postres Artesanales!
            </h1>
            <p className="text-[var(--color-text-light)] text-lg font-Lora mb-8">
                Hechos con amor, ingredientes frescos y una pizca de felicidad.
            </p>

            {/* Products images*/}
            <div className="flex w-full justify-center gap-12 mb-16">

                <div className="h-full text-start flex flex-col justify-evenly mb-24">
                <p className=" text-[var(--color-text-light)] text-center text-lg font-Lora mb-8">
                    Disfruta donde gustes nuestro combo estrella <br /> con un solo click
                </p>
                <p className="text-[var(--color-text)] text-3xl font-bold font-Lora mb-8 text-center">
                    Croissant bicolor de chocolate <br /> Y <br /> UN Macciato de la casa
                </p>
                </div>
                <img src="/images/promo.png" alt="" className="w-80 h-80 border rounded-lg "/>
                
            </div>

            {/* images products carril */}
            <div className="w-full justify-center flex gap-6 mb-4">
                <span className="flex justify-center font-bold items-center text-[var(--color-text)] font-Lora">y muchos mas...</span>
                <img src="/images/image-baklava-desktop.jpg" alt="" className="w-16 h-16 border rounded-lg " />
                <img src="/images/image-brownie-desktop.jpg" alt="" className="w-16 h-16 border rounded-lg " />
                <img src="/images/image-cake-desktop.jpg" alt="" className="w-16 h-16 border rounded-lg " />
                <img src="/images/image-macaron-desktop.jpg" alt="" className="w-16 h-16 border rounded-lg " />
                <img src="/images/image-meringue-desktop.jpg" alt="" className="w-16 h-16 border rounded-lg " />
                <img src="/images/image-panna-cotta-desktop.jpg" alt="" className="w-16 h-16 border rounded-lg " />
            </div>
            <button onClick={() => navigate("/products")}
                    className="
                        bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] 
                        text-white
                        px-8
                        py-3
                        rounded-lg
                        font-semibold
                        font-Josefin"
            >
                Ver Catalogo
            </button>
        </section>
        </>
    )
}