import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import NavBar from "../components/NavBar"
import ProductCard from "../components/ProductCard";
import MiniCart from "../components/MiniCart";
import { useCart } from "../context/CartContext";

export default function Products() {
    const { cart } = useCart();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        api
        .get("/products")
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err));
    }, []);

    const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return(
        <>
        <NavBar onSearch={setSearchTerm}/>
        <h1 className="
                px-6 
                text-center md:text-start
                py-6 md:py-12
                text-2xl md:text-4xl 2xl:text-6xl
                font-Lora 
                font-bold
                text-[var(--color-text)]
                bg-[var(--color-bg)]"
        >
            Nuestros Productos
        </h1>

        {/* div father*/}
        <div className="
                min-h-screen 
                grid grid-cols-4 md:grid-cols-6 xl:grid-cols-5 
                pt-18 
                gap-6 
                p-6 
                bg-[var(--color-bg)]"
        >
            
            {/* Grid Products */}
            <div className="
                        col-span-2 md:col-span-4 xl:col-span-3 
                        grid grid-cols-1 md:grid-cols-2 
                        gap-4"
            >
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))
                ) : ( 
                    <p className="text-center text-gray-500 col-span-3">No se encontraron Porductos</p>
                )}
            </div>
            
            {/* Lateral Cart-list*/}
            <div className={`${ cart.length === 0 ? "h-auto" : "max-h-screen" } 
                                sticky top-0 md:static
                                col-span-2 md:col-span-2 xl:col-span-1
                                col-start-3 md:col-start-5 lg:col-start-5
                                bg-[var(--color-surface)] 
                                p-4 
                                rounded-xl 
                                shadow 
                                transition-all 
                                self-start`
            }>
                <MiniCart />
            </div>
        </div>
        </>
    )
}