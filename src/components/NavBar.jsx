import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Search, CirclePower } from "lucide-react";
import Logo from "../assets/Logo-Wikipostres.svg?react";

export default function NavBar({ onSearch }) {
    const  [search, setSearch] = useState("");
    const { getTotalItems, clearCart } = useCart();
    const navigate = useNavigate();

    //function search for products
    const handleChange = (e) => {
        const term = e.target.value;
        setSearch(term);
        onSearch?.(term);  //comunicate with father...
    };

    //Log Out
    const handleLogout = () => {
        try{
        localStorage.removeItem("token");  //remove token
        localStorage.removeItem("user");
        clearCart(); //Clean Cart
        navigate("/");
        } catch(err) {
            console.error("Error cerrando sesión", err);
        }
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
                    w-[80%] md:w-[30%] lg:w-1/4 
                    flex items-end 
                    justify-between 
                    mb-2 md:-mb-10"
            >
            {/* Search input */}

            <div className="relative w-60 2xl:w-60">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-brand)] w-5 h-5" />
                <input
                type="text"
                placeholder="Busca tu postre favorito"
                value={search}
                onChange={handleChange}
                className="
                        w-full 
                        p-0 
                        pl-10 
                        border border-[var(--color-secondary)] 
                        rounded-md 
                        text-sm 
                        text-[var(--color-brand)]"
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

                    {/* Log out*/}
                    <button className="relative flex w-20" onClick={handleLogout}>
                    <CirclePower className="w-6 md:w-10 md:h-8 h-6 mx-auto" aria-label="Cerrar-sesión"/>
                    <span className="hidden md:block text-xs text-center">Cerrar Sesión</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}