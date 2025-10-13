import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import  { useCart } from "../context/CartContext";
import NavBar from "../components/NavBar";
import CheckoutOrder from "../components/checkoutOrder";

export default function Cart() {
  const { cart, getTotalItems, getTotalPrice, clearCart } = useCart();

  // checkout imputs
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("card");  // "card", "paypal", "efecty"
  const [cardNumber, setCardNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: "", paypalEmail: "", });
  const [phone, setPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [wrongPhone, setWrongPhone] = useState("");

  const navigate = useNavigate();

  const handleConfirm = async () => {
    

    if (!address) {
      alert("Porfavor ingresa tu direccion para que puedas disfrutar tus postres!!");
      return;
    }

    if (!/^[3]\d{9}$/.test(phone)) {
      setWrongPhone("El numero de telefono debe comenzar con 3 y tener 10 digitos");
      return
    }

    try{

      //Recover token from localStorage
      const token = localStorage.getItem("token");

      //token verification
      console.log("token actual:",token);

      // send order to back
      const response = await axios.post("http://localhost:3000/orders/checkout", {
        address,
        phone,
        deliveryMethod,
        paymentDetails: payment === "card"
          ? cardNumber
          : payment === "paypal"
          ? paypalEmail
          : null,
        items: cart.map((it) => ({
          productId: it.id,
          quantity: it.qty,
          price: it.price,
        })),
      },
      {
        headers: { Authorization: `Bearer ${token}`},
      }
    );

    console.log("orden confirmada:", {
      cart,
      total: getTotalPrice(),
      address,
      phone,
      deliveryMethod,
      payment,
    });

    //redirect
    navigate("/order", {
      state: {
        order: response.data.order,
        orderItems: response.data.orderItems,
      },

    });

    //Clear Cart
    clearCart();

    } catch(error){
      console.error("Error al crear la orden:", error);
      alert("Hubo un problema al procesar tu orden. Intenta de nuevo.");
    }
    
  };

  return (
    <div className="min-h-screen  bg-[var(--color-vanilla)]">
      <NavBar />
      <h1 className="text-3xl font-bold mb-6 text-[var(--color-text)] font-Lora">Confirmando tu compra!</h1>
      <div className="flex">
      {/* Product List*/}
      <div className="w-1/2">
        <CheckoutOrder />
      </div>
      {/* Checkout Form */}
      <div className="border  w-1/2 h-3/4 flex flex-col items-center justify-between bg-[var(--color-surface] p-6 mb-6">
        <h2 className="text-3xl font-bold font-Lora text-[var(--color-text)] mb-4">Datos de envio</h2>
            
            <div className="w-1/2">
            {/*Delivey Method*/}

            <div className="flex flex-col">
              <label className="block mb-2 font-medium font-Lora">Metodo de Entrega</label>

              {/* opcion: 1 delivery*/}
              <div className="">
              <button
                type="button"
                onClick={() => setDeliveryMethod("delivery")}
                className={`
                          flex-1 w-1/2 p-2 rounded-lg border font-Josefin 
                          ${ deliveryMethod === "delivery" 
                            ? "bg-[var(--color-accent)] text-white" 
                            : " bg-white text-[var(--color-secondary)] border border-gray-300" 
                            }`}
              >
                Domicilio
              </button>

              {/* opcion: 2 pickup*/}
              <button
                type="button"
                onClick={() => setDeliveryMethod("pickup")}
                className={`
                          flex-1 w-1/2 p-2 rounded-lg border font-Josefin 
                          ${ deliveryMethod === "pickup" 
                            ? "bg-[var(--color-accent)] text-white" 
                            : " bg-white text-[var(--color-secondary)] border border-gray-300"
                            }`}
              >
                Retiro en Tienda
              </button>
              </div>
            </div>
            
            {/*Address*/}
            <label className="block mb-2 font-medium font-Lora">Dirección:</label>
            <input 
              type="text"
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              disabled={deliveryMethod === "pickup"}
              className={`w-full p-2 border rounded mb-4 font-Josefin ${
                          deliveryMethod === "pickup" ? "bg-gray-200 cursor-not-allowed" :""
              }`}
              placeholder="Avenida Siempreviva 742, Ciudad, Pais"
            />

            {/*Phone*/}
              <label className="block mb-2 font-medium font-Lora" >Telefono</label>
              <input 
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2 border rounded mb-4 font-Josefin"
                  placeholder="300-000-0000" 
              />
                { wrongPhone && (
                  <p className="text-red-600 text-sm mb-2">{wrongPhone}</p>
                )}

            {/*paymentMethod*/}
            <div>
              <label className="block mb-2 font-medium font-Lora">Metodo de pago</label>
              
              <div className="flex border mb-8 ">
                {/*Card method*/}
                <button
                    type="button"
                    onClick={() => setPayment("card")}
                    className={`
                          flex-1 w-1/3 p-2 rounded-lg border font-Josefin text-xs 
                          ${ payment === "card" 
                            ? "bg-[var(--color-accent)] text-white" 
                            : " bg-white text-[var(--color-secondary)] border border-gray-300"
                            }`}
                >
                  Tarjeta de Credito
                </button>

                {/*Paypal method*/}
                <button
                    type="button"
                    onClick={() => setPayment("paypal")}
                    className={`
                          flex-1 w-1/3 p-2 rounded-lg border font-Josefin text-xs 
                          ${ payment === "paypal" 
                            ? "bg-[var(--color-accent)] text-white" 
                            : " bg-white text-[var(--color-secondary)] border border-gray-300"
                            }`}
                >
                  Paypal
                </button>

                {/*Efecty method*/}
                <button
                    type="button"
                    onClick={() => setPayment("efecty")}
                    className={`
                          flex-1 w-1/3 p-2 rounded-lg border font-Josefin text-xs
                          ${ payment === "efecty" 
                            ? "bg-[var(--color-accent)] text-white" 
                            : " bg-white text-[var(--color-secondary)] border border-gray-300"
                            }`}
                >
                  Contra Entrega
                  </button>
              </div>

              {/* card */}
              {payment === "card" && (
                <div className="w-full">
                    <label className="block text-sm font-semibold mb-1">Número de Tarjeta</label>
                    <input 
                      type="text"
                      placeholder="xxxx xxxx xxxxxxxx"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="p-2 border rounded-md w-full" 
                    />
                </div>
              )}

              {/* paypal */}
              {payment === "paypal" && (
                <div className="w-full">
                    <label className="block text-sm font-semibold mb-1">Correo paypal</label>
                    <input 
                        type="text"
                        placeholder="correo"
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        className="p-2 border rounded-md w-full" 
                    />
                </div>
              )}
            </div>

              {/* Confirmation Button*/}
              <button 
                onClick={handleConfirm}
                className="
                           w-full 
                           bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] 
                           text-white 
                           font-semibold 
                           py-3 
                           rounded-lg"
              >
                Confirmar Compra
              </button>
              
              </div>
              
          </div>
        </div>
      </div>
    
  )
}