import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Order() {
  const location = useLocation();
  const navigate = useNavigate();

  const { order, orderItems } = location.state || {};

  // Si por algún motivo no llega la orden (refresh, acceso directo)
  if (!order || !orderItems) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-vanilla)]">
        <h1 className="text-2xl font-semibold text-[var(--color-chocolate)] mb-4">
          No hay ninguna orden reciente.
        </h1>
        <button
          onClick={() => navigate("/home")}
          className="bg-[var(--color-brand)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-brand-dark)]"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col  p-6">
      <NavBar/>

      {/* Voucher */}
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md mt-10 p-6 border border-dashed border-[var(--color-brand)] mx-auto">
        <h1 className="text-3xl font-bold text-center text-[var(--color-text)] font-Lora mb-4">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-center text-[var(--color-text-light)] font-Josefin mb-6">
          Tu pedido ha sido registrado con éxito.!!
        </p>

        {/* Order Info */}
        <div className="text-sm text-gray-700 mb-6 ">
          <p className="text-[var(--color-text)]"><strong>ID de orden:</strong> {order.id}</p>
          <p className="text-[var(--color-text)]"><strong>Cliente:</strong> {order.user?.name}</p>
          <p className="text-[var(--color-text)]"><strong>Email:</strong> {order.user?.email}</p>
          <p className="text-[var(--color-text)]"><strong>Telefono:</strong> {order.phone}</p>
          <p className="text-[var(--color-text)]"><strong>Dirección:</strong> {order.deliveryMethod === "pickup" ? "Retiro en tienda" : order.address }</p>
          <p className="text-[var(--color-text)]"><strong>Método de pago:</strong> {order.paymentMethod}</p>
          <p className="text-[var(--color-text)]"><strong>Estado:</strong> {order.status}</p>
          <p className="text-[var(--color-text)]"><strong>Total:</strong> ${parseFloat(order.totalPrice).toFixed(2)}</p>
        </div>

        <hr className="my-4 border-dashed border-gray-300" />

        {/* Order Items */}
        <h2 className="text-lg font-semibold text-[var(--color-text-light)] font-Lora mb-3">
          Detalles del pedido
        </h2>
        <div className="space-y-3">
          {orderItems.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center border-b border-gray-100 pb-2"
            >
              <span className="text-[var(--color-text-light)] font-Josefin">{item.product?.name || `Producto #${item.productId}`}</span>
              <span className="text-[var(--color-warm)] text-sm font-Josefin">
                {item.quantity} x ${parseFloat(item.price).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="
                bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] 
                text-white 
                font-Josefin
                px-6 
                py-3 
                rounded-lg 
                font-semibold"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
