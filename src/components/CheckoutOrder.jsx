import { useCart } from "../context/CartContext";

export default function CheckoutOrder() {
    const { cart, getTotalItems, getTotalPrice } = useCart();

    return (
        <div className="">
      {cart.length === 0 ? (
        <p className="text-lg">No hay orden por ahora, que esperas? vuelve por tu postre!</p>
      ) : (
        <div className="h-screen md:h-3/4 lg:h-screen">
          <div className=" flex flex-col items-center h-3/4">
        <div 
          className="
                flex flex-col 
                items-center 
                gap-4 
                mb-6 
                w-full md:w-1/2 
                h-3/4 2xl:h-[85%]
                overflow-y-scroll
                ">
          {cart.map((p) => (
            <div key={p.id} 
                 className=" 
                    w-1/2 md:w-full lg:w-3/4
                    border-b border-[var(--color-secondary)] 
                    flex 
                    items-center 
                    justify-between 
                    bg-white  
                    rounded-lg 
                    p-2 
                    h-24"
            >
              <div className="flex items-center gap-4">
                <img src={p.image_mobile} alt={p.name} className="w-10 2xl:w-16 h-10 2xl:h-16 rounded object-cover" />
                <div>
                  <h2 className="font-Lora text-xs 2xl:text-lg text-[var(--color-text)]">{p.name}</h2>
                  <p className="font-Josefin text-xs 2xl:text-lg text-[var(--color-text-light)]">
                    {p.qty} x ${Number(p.price).toFixed(2)}
                  </p>
                </div>
              </div>

            </div>
          ))}
          
        </div>

        {/* Totals */}
            <div className="w-full mb-6 text-center">
              <p className="
                    text-md 2xl:text-lg
                    font-semibold 
                    font-Lora 
                    text-[var(--color-text)]"
              >
                Compras un total de : {getTotalItems()} productos
              </p>
              <p className="
                    mt-4 
                    text-3xl 2xl:text-4xl
                    font-bold 
                    font-Josefin 
                    text-[var(--color-warm)]"
              >
                Total: ${getTotalPrice().toFixed(2)}
              </p>
            </div>  
          </div>
          </div>)}
          </div>
    )
}