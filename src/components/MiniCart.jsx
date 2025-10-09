import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { X } from "lucide-react";


export default function MiniCart() {
    const { cart, getTotalItems, getTotalPrice, removeFromCart } = useCart();

    if(!cart.length) {
        return (
            <div className="p-4">
                <h3 className="font-bold">Tu Carrito</h3>
                <p className="text-sm text-gray-600">Vacio por ahora... </p>
            </div>
        );
    }

    return (
        <div className="p-4 h-full flex flex-col">
            <h3 className="font-bold"> Tu Carrito</h3>

            <div className="flex-1 overflow-y-auto">
                {cart.map((it) => (
                    <div key={it.id} className="flex justify-between">
                    <div  className="flex items-center pag-3 mb-3">
                        <img src={it.image_mobile || it.image_desktop } alt={it.name} className="w-12 h-12 object-cover rounded"/>
                        <div className="flex-1">
                            <div className="text-sm font-semibold">{it.name}</div>
                            <div className="text-xs text-gray-600">{it.qty} x ${parseFloat(it.price || 0).toFixed(2)}</div> 
                        </div>
                    </div>
                    <button onClick={() => removeFromCart(it.id)}>
                        < X />
                    </button>
                    </div>
                ))}
            </div>

            <div className="mt-3">
                <div className="flex justify-between mb-3">
                    <div className="font-semibold">Total</div>
                    <div className="font-bold">${getTotalPrice().toFixed(2)}</div>
                </div>

                <Link to="/cart" className="block w-full text-center py-2 bg-[var(--color-chocolate)] text-white rounded-md">
                    Ver Carrito ({getTotalItems()})
                </Link>
            </div>
        </div>
    );
}