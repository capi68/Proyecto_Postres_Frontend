import { useCart  } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return(
        
         <div  className="bg-[var(--color-vanilla)] p-4 rounded-xl shadow hover:shadow-lg h-60 flex flex-col justify-between">
             <div className="flex justify-evenly">
                <img src={product.image_desktop} alt={product.name} className="rounded-lg mb-3 h-24" />
                <h3 className="text-center text-2xl font-[Josefin_Sans] font-bold text-[var(--color-chocolate)]">{product.name}</h3>
             </div>
                <p className="font-[Josefin_Sans] font-thin text-[var(--color-chocolate)] text-xs">{product.description}</p>
                <p className="font-[Josefin_Sans] font-semibold text[var(--color-chocolate)]">${Number(product.price).toFixed(2)}</p>
            <button onClick={() => addToCart(product)} className="mb-2 w-full bg-[var(--color-brand)] hover:bg-[var(color-brand-dark)] text-white py-2 rounded-lg">
                Agregar al carrito
            </button>
         </div>
        )
}
