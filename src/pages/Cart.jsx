import React, { useState } from "react";
import  { useCart } from "../context/CartContext";
import { X } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, getTotalItems, getTotalPrice } = useCart();

  // checkout imputs
  const [adress, setAdress] = useState("");
  const [payment, setPayment] = useState("card");

  const handleConfirm = () => {
    if (!adress) {
      alert("Porfavor ingresa tu direccion para que puedas disfrutar tus postres!!");
      return;
    }

    // send order to back
    console.log("orden confirmada:", {
      cart,
      total: getTotalPrice(),
      adress,
      payment,
    });

    //redirect
    window.location.href = "/order";
  };

  return (
    <div className="min-h-screen p-6 bg-[var(--color-vanilla)]">
      <h1 className="text-3xl font-bold mb-6 text-[var(--color-chocolate)]">Confirmando tu compra!</h1>

      {/* Product List*/}

      {cart.length === 0 ? (
        <p className="text-lg">No hay orden por ahora, que esperas? vuelve por tu postre!</p>
      ) : (
        <div className="grid gap-4 mb-6">
          {cart.map((p) => (
            <div key={p.id} className="flex justify-between items-center bg-white shadow rounded-lg p-4">
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
      )}

      {/* Totals */}
      <div className="mb-6">
        <p className="text-lg font-semibold">Compras un total de : {getTotalItems()} productos</p>
        <p>Total: ${getTotalPrice().toFixed(2)}</p>
      </div>

      {/* Checkout Fomr */}

      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Datos de envio</h2>

        <label className="block mb-2 font-medium">Dirección:</label>
        <input 
          type="text"
          value={adress} 
          onChange={(e) => setAdress(e.target.value)}
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
  )
}