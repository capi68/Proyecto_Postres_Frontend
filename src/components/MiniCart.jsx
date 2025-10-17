import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { X } from "lucide-react";


export default function MiniCart() {
    const { cart, getTotalItems, getTotalPrice, removeFromCart } = useCart();

    if(!cart.length) {
        return (

            <div className="p-4">
                <h3 className="
                    font-Lora 
                    font-semibold 
                    text-lg 
                    text-center 
                    text-[var(--color-text)]
                    mb-4
            ">
                No tienes productos aún
            </h3>
                
            </div>
        );
    }

    return (
        <div className="p-0 md:p-2 h-full flex flex-col bg-[var(--color-surface)]">
            <h3 className="
                    font-Lora 
                    font-semibold 
                    text-sm md:text-lg 
                    text-center 
                    text-[var(--color-text)]
                    mb-4
            "> 
                Productos agregados en tu carrito
            </h3>

            <div className="flex-1 overflow-y-auto">
                {cart.map((it) => (
                <div key={it.id} className="flex justify-between">
                    <div  className="w-full flex items-center  mb-3">

                        {/* Product Tumbnail*/}
                        <img 
                            src={it.image_mobile || it.image_desktop } 
                            alt={it.name} 
                            className="hidden md:block w-12 h-12 object-cover rounded"
                        />
                        {/*Product Name*/}
                        <div className="ml-2 flex-1">
                            <div className="
                                    text-xs md:text-sm 
                                    font-Lora 
                                    text-[var(--color-text)] 
                                    font-semibold"
                            >
                                {it.name}
                            </div>
                            <div className="
                                    text-xs 
                                    font-Josefin 
                                    text-[var(--color-text-light)]"
                            >
                                {it.qty} x ${parseFloat(it.price || 0).toFixed(2)}
                            </div> 
                        </div>

                        <button 
                            onClick={() => removeFromCart(it.id)} 
                            className="text-[var(--color-error)]">
                            < X />
                        </button>
                    </div>
                    
                    </div>
                ))}
            </div>

            <div className="mt-3">
                <div className="flex justify-between mb-3">
                    <div className="
                            font-bold 
                            font-Josefin 
                            text-xl 
                            text-[var(--color-warm)]"
                    >
                        Total
                    </div>
                    <div className="
                            font-bold 
                            font-Josefin
                            text-xl 
                            text-[var(--color-warm)]"
                    >
                        ${getTotalPrice().toFixed(2)}
                    </div>
                </div>

                <Link 
                    to="/cart" 
                    className="
                        block 
                        w-full
                        font-Josefin 
                        text-center 
                        text-white 
                        py-2 
                        bg-[var(--color-accent)] 
                        hover:bg-[var(--color-accent-hover)]
                        rounded-md"
                >
                    Ver Carrito ({getTotalItems()})
                </Link>
            </div>
        </div>
    );
}