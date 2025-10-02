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
        <div className="h-screen grid grid-cols-5  gap-6 p-6">
            {/* Grid de productos */}
            <div className="col-span-3 grid grid-cols-3 gap-4">
                {products.map((p) => (
                    <div key={p.id} className="bg-[var(--color-vanilla)] p-4 rounded-xl shadow hover:shadow-lg h-60 flex flex-col justify-between">
                        <div className="flex justify-evenly">
                        <img src={p.image_desktop} alt={p.name} className="rounded-lg mb-3 h-24" />
                        <h3 className="text-center text-2xl font-[Josefin_Sans] font-bold text-[var(--color-chocolate)]">{p.name}</h3>
                        </div>
                        <p className="font-[Josefin_Sans] font-thin text-[var(--color-chocolate)] text-xs">{p.description}</p>
                        <p className="font-[Josefin_Sans] font-semibold text[var(--color-chocolate)]">${Number(p.price).toFixed(2)}</p>
                        <button className="mb-2 w-full bg-[var(--color-brand)] hover:bg-[var(color-brand-dark)] text-white py-2 rounded-lg">
                            Agregar al carrito
                        </button>
                    </div>
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