import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import  { useCart } from "../context/CartContext";
import NavBar from "../components/NavBar";
import CheckoutOrder from "../components/CheckoutOrder";
import api from "../api/axiosConfig";


export default function Cart() {
  const { cart, getTotalItems, getTotalPrice, clearCart } = useCart();

  // checkout imputs
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("card");  // "card", "paypal", "efecty"
  const [cardNumber, setCardNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({ cardNumber: "", paypalEmail: "", });
  const [cardType, setCardType] = useState ("");
  const [phone, setPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [wrongPhone, setWrongPhone] = useState("");
  const [putNumberCard, setPutNumberCard] = useState("");
  const [putPaypalEmail, setPutPaypalEmail] = useState("");
  const navigate = useNavigate();

  const handleConfirm = async () => {
    

    if (deliveryMethod === "delivery" && !address.trim()) {
      alert("Porfavor ingresa tu direccion para que puedas disfrutar tus postres!!");
      return;
    } else if (deliveryMethod === "pickup") {
      
    }

    if (!/^[3]\d{9}$/.test(phone)) {
      setWrongPhone("El numero de telefono debe comenzar con 3 y tener 10 digitos");
      return;
    }

    // put card
    if (payment === "card" && cardNumber.trim() === "") {
      setPutNumberCard("Introduce el numero de tu tarjeta");
      return;
    }

    //put Paypal Email
    if (payment === "paypal" && paypalEmail.trim() === "") {
      setPutPaypalEmail("Introduce tu correo Paypal");
      return;
    }

    try{

      //Recover token from localStorage
      const token = localStorage.getItem("token");

      //token verification
      console.log("token actual:",token);

      // send order to back
      const response = await api.post("/orders/checkout", {
        address,
        phone,
        deliveryMethod,
        paymentMethod: payment,
        items: cart.map((it) => ({
          productId: it.id,
          quantity: it.qty,
          price: it.price,
        })),
      });

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
    orderItems: response.data.order.orderItems 
  },
});

    //Clear Cart
    clearCart();

    } catch(error){
      console.error("Error al crear la orden:", error);
      alert("Hubo un problema al procesar tu orden. Intenta de nuevo.");
    }
    
  };

  const detectCardType = (number) => {
    const re = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      diners: /^3(?:0[0-5]|[68])/,
    };
    if (re.visa.test(number)) return "Visa";
    if (re.mastercard.test(number)) return "Mastercard";
    if (re.amex.test(number)) return "Amex";
    if (re.diners.test(number)) return "Diners Club";
    return "desconocida";
  };

  return (
    <div className="min-h-screen  bg-[var(--color-surface)]">
      <NavBar />
      <h1 className="
              text-2xl md:text-4xl 2xl:text-6xl 
              font-bold 
              md:ml-2
              mt-6
              mb-6 
              text-center md:text-left
              text-[var(--color-text)] 
              font-Lora"
      >
        Confirmando tu compra!
      </h1>
      <div className="flex flex-col md:flex-row pt-2">
      {/* Product List*/}
      <div className="w-full md:w-1/2 h-[70dvh] lg:h-screen">
        <CheckoutOrder />
      </div>

      {/* Checkout Form */}
      <div className="
                w-full md:w-1/2 
                h-3/4 2xl:h-full
                flex flex-col 
                items-center 
                justify-between 
                bg-[var(--color-surface)] 
                p-6 
                mb-6"
      >
        <h2 className="
                text-2xl md:text-4xl 2xl:text-6xl 
                font-bold 
                font-Lora 
                text-[var(--color-text)] 
                mb-4"
        >
          Datos de envio
        </h2>
            
            <div className="w-full xl:w-1/2">
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
              
              <div className="flex mb-8 ">
                {/*Card method*/}
                <button
                    type="button"
                    onClick={() => {
                      setPayment("card");
                      setPutNumberCard("");
                      setPutPaypalEmail("");
                    }}
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
                    onClick={() => {
                       setPayment("paypal");
                       setPutNumberCard("");
                       setPutPaypalEmail("");
                      }}
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
                    onClick={() =>{
                      setPayment("efecty");
                      setPutNumberCard("");
                      setPutPaypalEmail("");
                    }}
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
                      placeholder="xxxx xxxx xxxx xxxx"
                      value={cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "") // delete spaces or letters
                        setCardNumber(value);
                        setCardType(detectCardType(value));
                      }}
                      className="p-2 border rounded-md w-full mb-2" 
                    />
                    {cardType && (
                      <p className="text-sm text-[var(--color-success)] mt-1 mb-2">{cardType}</p>
                    )}
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
                        className="p-2 border rounded-md w-full mb-2" 
                    />
                </div>
              )}
            </div>
            
            { putNumberCard && (
                  <p className="text-red-600 text-sm mb-2">{putNumberCard}</p>
                )}
              
              { putPaypalEmail && (
                  <p className="text-red-600 text-sm mb-2">{putPaypalEmail}</p>
                )}


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