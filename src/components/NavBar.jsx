import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Logo from "../assets/Logo-Wikipostres.svg?react";

export default function NavBar() {
    return (
        <nav>
            {/* Logo */}
            <Logo />

            {/* Links */}
            <div className="flex gap-6 text-[var(--color-chocolate)] font-[Josefin-Sans] ">
                <Link to="/desserts" className="hover:text-[var(--brand-dark)]">Postres</Link>
                <Link to="/hot-drinks"className="hover:text-[var(--brand-dark)]">Bebidas calientes</Link>
                <Link to="/cold-drinks" className="hover:text-[var(--brand-dark)]">Bebidas Frias</Link>
                <Link to="/about" className="hover:text-[var(--brand-dark)]">Nosotros</Link>
            </div>

            {/* Cart */}
            <Link to="/Cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-[var(--color-chocolate)]" />
                 {/* badge opcional */}
                <span className="absolute -top-2 -right-2 bg-brand text-white text-xs px-2 py-0.5 rounded-full">
                    3
                </span>
            </Link>
        </nav>
    );
}