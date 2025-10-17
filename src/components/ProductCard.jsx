import { useCart  } from "../context/CartContext";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return(
        
         <div  className="
                    relative
                    bg-[var(--color-surface)] 
                    p-2 
                    h-40 md:h-60 lg:h-64 xl:h-60
                    rounded-xl 
                    shadow hover:shadow-lg 
                    flex  
                    justify-between
                    overflow-hidden"
         >

                {/* Product image*/}
                <img 
                    src={product.image_desktop} 
                    alt={product.name} 
                    className="absolute 
                               rounded-lg  
                               h-16 md:h-28 lg:h-36 xl:h-60 
                               left-0 md:-left-4 lg:-left-1 xl:-left-20 2xl:left-0
                               top-0" 
                />
                
                {/* info products*/}
                <div className="absolute 
                                w-full xl:w-[50%] 2xl:w-[60%]
                                left-0 xl:left-48 2xl:left-72
                                h-full 
                                flex flex-col justify-evenly"
                >
                    {/* Name products*/}
                    <h3 className="
                            md:-mt-4
                            w-[55%] xl:w-full
                            ml-auto
                            text-center 
                            text-md md:text-2xl lg:text-xl 2xl:text-3xl
                            font-Lora
                            font-bold 
                            text-[var(--color-text)]"
                    >
                    {product.name}
                    </h3>
                    {/* product description*/}
                    <p className=" 
                            lg:w-1/2 xl:w-full
                            ml-auto
                            hidden lg:block
                            font-Josefin 
                            font-xs 
                            text-[var(--color-text)] 
                            text-xs 2xl:text-lg
                            text-center"
                    >
                        {product.description}
                    </p>
                    {/* price */}
                    <p className="
                            mt-6 md:mt-8 lg:mt-2 xl:mt-0
                            font-Josefin 
                            font-semibold 
                            text-[var(--color-warm)]
                            text-2xl lg:text-xl 2xl:text-3xl
                            text-left md:text-center lg:text-left"
                    >
                        ${Number(product.price).toFixed(2)}
                    </p>

                <button 
                    onClick={() => addToCart(product)} 
                    className="
                        mb-2 lg:mb-0 xl:mg-2
                        py-2 
                        w-[90%] md:w-[80%] xl:w-full
                        mx-auto 
                        font-Josefin
                        bg-[var(--color-accent)] 
                        hover:bg-[var(--color-accent-hover)] 
                        text-white 
                        2xl:text-xl
                        rounded-lg"
                >
                    Agregar al carrito
                </button>
            </div>
         </div>
        )
}

