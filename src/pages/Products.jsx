import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar"

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
        <div className="grid grid-cols-4 gap-6 p-6">
            {/* Grid de productos */}
            <div className="col-span-3 grid grid-cols-3 gap-4">
                {products.map((p) => (
                    <div key={p.id} className="bg-[var(--color-lemon)] p-4 rounded-xl shadow hover:shadow-lg">
                        <img src={p.image_desktop} alt={p.name} className="rounded-lg mb-3" />
                        <h3 className="font-[Josefin_Sans] font-bold text-[var(--color-chocolate)]">{p.name}</h3>
                        <p className="font-[Josefin_Sans] font-thin text-[var(--color-chocolate)]">{p.description}</p>
                        <p className="font-[Josefin_Sans] font-semibold text[var(--color-chocolate)]">${Number(p.price).toFixed(2)}</p>
                        <button className="mt-2 w-full bg-[var(--color-brand)] hover:bg-[var(color-brand-dark)] text-white py-2 rounded-lg">
                            Agregar al carrito
                        </button>
                    </div>
                ))}
            </div>
            
            {/* Lateral Cart-list*/}
            <div className="col-span-1 bg-[var(--color-vanilla)] p-4 rounded-xl shadow">
                <h2>Carrito de compras</h2>
                <p className="text-sm">Vacio por ahora</p>
            </div>
        </div>
        </>
    )
}