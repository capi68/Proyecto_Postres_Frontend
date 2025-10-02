import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar"
import ProductCard from "../components/ProductCard";

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:3000/products")
        .then((res) => setProducts(res.data))
        .catch((err) => console.error(err));
    }, []);

    return(
        <>
        <NavBar />
        <div className="h-screen grid grid-cols-5  gap-6 p-6">
            {/* Grid Products */}
            <div className="col-span-3 grid grid-cols-3 gap-4">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
            
            {/* Lateral Cart-list*/}
            <div className="col-span-1 col-start-5 bg-[var(--color-vanilla)] p-4 rounded-xl shadow">
                <h2>Carrito de compras</h2>
                <p className="text-sm">Vacio por ahora</p>
            </div>
        </div>
        </>
    )
}