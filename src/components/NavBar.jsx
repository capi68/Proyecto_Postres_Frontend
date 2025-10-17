import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import Logo from "../assets/Logo-Wikipostres.svg?react";

export default function NavBar({ onSearch }) {
    const  [search, setSearch] = useState("");

    const { getTotalItems } = useCart();

    //function search for products
    const handleChange = (e) => {
        const term = e.target.value;
        setSearch(term);
        onSearch?.(term);  //comunicate with father...
    };

    return (
        <nav>
            
            <div className="
                    w-full 
                    flex  flex-col md:flex-row 
                    h-24 md:h-auto
                    items-center 
                    justify-between md:justify-center 
                    gap-6 
                    text-[var(--color-brand)] hover:text-[var(--color-brand-hover)] 
                    font-[Lora] 
                    bg-[var(--color-bg)]"
            >
            {/* Links */}
            <div className="
                    w-[70%] md:w-[30%] lg:w-[20%] 
                    mt-4 md:mt-0
                    flex justify-between 
                    -mb-10 
                    text-sm 2xl:text-lg" 
            >
                <Link to="/home" className=" hover:font-semibold">Inicio</Link>
                <Link to="/products" className=" hover:font-semibold">Catalogo</Link>
                <Link to="/nosotros" className=" hover:font-semibold">Nosotros</Link>
            </div>
            {/* Logo */}
            <Logo className="hidden md:block w-36 h-24 " />


            <div className="
                    w-[70%] md:w-[30%] lg:w-1/4 
                    flex items-end 
                    justify-evenly 
                    mb-2 md:-mb-10"
            >
            {/* Search input */}

            <div className="relative w-60 2xl:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-brand)] w-5 h-5" />
                <input
                type="text"
                placeholder="Busca tu postre favorito"
                value={search}
                onChange={handleChange}
                className="w-full p-0 pl-10 border border-[var(--color-secondary)] rounded-md text-sm text-[var(--color-brand)]"
                />
            </div>

                    {/* Cart */}
                    <Link to="/Cart" className="relative">
                    <ShoppingCart className="w-6 h-6 " />
                        {/* badge opcional */}
                        <span className="absolute -top-2 -right-2  text-black text-xs px-2 py-0 rounded-full">
                            {getTotalItems()}
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}