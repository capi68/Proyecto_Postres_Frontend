import React, { useState } from "react";
import axios from "axios";
import  { useCart } from "../context/CartContext";
import { X } from "lucide-react";
import NavBar from "../components/NavBar";

export default function Cart() {
  const { cart, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  // checkout imputs
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("card");

  const handleConfirm = async () => {
    if (!address) {
      alert("Porfavor ingresa tu direccion para que puedas disfrutar tus postres!!");
      return;
    }

    try{

      //Recover token from localStorage
      const token = localStorage.getItem("token");
      // send order to back
      const response = await axios.post("http://localhost:3000/orders/checkout", {
        address,
        paymentMethod: payment,
      },
      {
        headers: { Authorization: `Bearer ${token}`},
      }
    );

    console.log("orden confirmada:", {
      cart,
      total: getTotalPrice(),
      address,
      payment,
    });

    //redirect
    window.location.href = "/order";

    } catch(error){
      console.error("Error al crear la orden:", error);
      alert("Hubo un problema al procesar tu orden. Intenta de nuevo.");
    }
    
  };

  return (
    <div className="min-h-screen p-6 bg-[var(--color-vanilla)]">
      <NavBar />
      <h1 className="text-3xl font-bold mb-6 text-[var(--color-chocolate)]">Confirmando tu compra!</h1>

      {/* Product List*/}

      {cart.length === 0 ? (
        <p className="text-lg">No hay orden por ahora, que esperas? vuelve por tu postre!</p>
      ) : (
        <div className="h-screen border border-blue-600 flex">
        <div className="grid gap-4 mb-6 border border-black w-[30%]">
          {cart.map((p) => (
            <div key={p.id} className="border border-yellow-500 flex justify-between items-center bg-white shadow rounded-lg p-4">
              <div className="flex items-center gap-4">
                <img src={p.image_mobile} alt={p.name} className="w-16 h-16 rounded object-cover" />
                <div>
                  <h2>{p.name}</h2>
                  <p>{p.qty} x ${Number(p.price).toFixed(2)}</p>
                </div>
              </div>

              <button onClick={() => removeFromCart(p.id)}>
                <X />
              </button>
            </div>
          ))}  
        </div>

        {/* Totals */}
          <div className="w-[30%] mb-6">
          <p className="text-lg font-semibold">Compras un total de : {getTotalItems()} productos</p>
          <p>Total: ${getTotalPrice().toFixed(2)}</p>
          </div>

          {/* Checkout Form */}

          <div className="w-[40%] h-1/2 flex flex-col justify-between bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Datos de envio</h2>
            <div>
            <label className="block mb-2 font-medium">Dirección:</label>
            <input 
              type="text"
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Avenida Siempreviva 742, Ciudad, Pais"
            />

            <label className="block mb-2 font-medium">Metodo de pago</label>
              <select 
                type={payment}
                onChange={(e) => setPayment(e.value.target)}
                className="w-full p-2 border rounded" 
              >
                <option value="card">Tarjeta de Credito</option>
                <option value="paypal">Paypal</option>
                <option value="cash">Pago contra Entrega</option>
              </select>
              </div>
              {/* Confirmation Button*/}
              <button 
                onClick={handleConfirm}
                className="w-full bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white font-semibold py-3 rounded-lg"
              >
                Confirmar Compra
              </button>
          </div>
        </div>
      )}
    </div>
  )
}