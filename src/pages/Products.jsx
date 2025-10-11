import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar"
import ProductCard from "../components/ProductCard";
import MiniCart from "../components/MiniCart";
import { useCart } from "../context/CartContext";

export default function Products() {
    const { cart } = useCart();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
        .get("http://localhost:3000/products")
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err));
    }, []);

    const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return(
        <>
        <NavBar onSearch={setSearchTerm}/>
        <div className="h-screen grid grid-cols-5  gap-6 p-6 bg-[var(--color-bg)]">
            {/* Grid Products */}
            <div className="col-span-3 grid grid-cols-3 gap-4">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))
                ) : ( 
                    <p className="text-center text-gray-500 col-span-3">No se encontraron Porductos</p>
                )}
            </div>
            
            {/* Lateral Cart-list*/}
            <div className={`${ cart.length === 0 ? "h-auto" : "max-h-screen" } col-span-1 col-start-5 bg-[var(--color-vanilla)] p-4 rounded-xl shadow transition-all self-start`}>
                <MiniCart />
            </div>
        </div>
        </>
    )
}