import { useCart  } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return(
        
         <div  className="
                    relative
                    bg-[var(--color-surface)] 
                    p-2 
                    h-60
                    rounded-xl 
                    shadow hover:shadow-lg 
                    flex  
                    justify-between
                    overflow-hidden"
         >

             
                <img 
                    src={product.image_desktop} 
                    alt={product.name} 
                    className="absolute rounded-lg  h-60 -left-20 top-0" 
                />

                <div className="absolute w-[50%] left-48 h-full flex flex-col justify-evenly">
                <h3 className="
                        text-center 
                        text-2xl  
                        font-[Josefin_Sans] 
                        text-[var(--color-text)]"
                >
                {product.name}
                </h3>
             
                <p className="
                        font-[Josefin_Sans] 
                        font-thin 
                        text-[var(--color-text)] 
                        text-xs
                        text-center"
                >
                    {product.description}
                </p>
                <p className="
                        font-[Josefin_Sans] 
                        font-semibold 
                        text-[var(--color-warm)]
                        text-xl"
                >
                    ${Number(product.price).toFixed(2)}
                </p>

                <button 
                    onClick={() => addToCart(product)} 
                    className="
                        mb-2
                        py-2 
                        w-full 
                        bg-[var(--color-accent)] 
                        hover:bg-[var(color-brand-dark)] 
                        text-white 
                        rounded-lg"
                >
                    Agregar al carrito
                </button>
            </div>
         </div>
        )
}

