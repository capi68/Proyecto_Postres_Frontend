import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Order() {
  const location = useLocation();
  const navigate = useNavigate();

  // Estado local
  const [data, setData] = useState(() => {
    return location.state || JSON.parse(localStorage.getItem("lastOrder")) || {};
  });

  const { order, orderItems } = data;

  // Si el usuario recarga, rehidratar datos desde localStorage
  useEffect(() => {
    if (location.state) {
      localStorage.setItem("lastOrder", JSON.stringify(location.state));
    }
  }, [location.state]);

  // Si no hay datos
  if (!order || !orderItems) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg)]">
        <h1 className="text-2xl font-semibold text-[var(--color-brand)] mb-4">
          No hay ninguna orden reciente.
        </h1>

        <button
          onClick={() => navigate("/home")}
          className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white px-6 py-3 rounded-lg font-semibold"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col p-6">
      <NavBar />

      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md mt-10 p-6 border border-dashed border-[var(--color-brand)] mx-auto">
        <h1 className="text-3xl font-bold text-center text-[var(--color-text)] font-Lora mb-4">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-center text-[var(--color-text-light)] font-Josefin mb-6">
          Tu pedido ha sido registrado con éxito.!!
        </p>

        <div className="text-sm mb-6">
          <p><strong>ID de orden:</strong> {order.id}</p>
          <p><strong>Cliente:</strong> {order.user?.name}</p>
          <p><strong>Email:</strong> {order.user?.email}</p>
          <p><strong>Teléfono:</strong> {order.phone}</p>
          <p><strong>Dirección:</strong> {order.deliveryMethod === "pickup" ? "Retiro en tienda" : order.address}</p>
          <p><strong>Método de pago:</strong> {order.paymentMethod}</p>
          <p><strong>Estado:</strong> {order.status}</p>
          <p><strong>Total:</strong> ${parseFloat(order.totalPrice).toFixed(2)}</p>
        </div>

        <hr className="my-4 border-dashed border-gray-300" />

        <h2 className="text-lg font-semibold text-[var(--color-text-light)] font-Lora mb-3">
          Detalles del pedido
        </h2>
        <div className="space-y-3">
          {orderItems.map((item) => (
            <div key={item.productId} className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-[var(--color-text-light)] font-Josefin">
                {item.product?.name || `Producto #${item.productId}`}
              </span>
              <span className="text-[var(--color-warm)] text-sm font-Josefin">
                {item.quantity} x ${parseFloat(item.price).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/home")}
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-Josefin px-6 py-3 rounded-lg font-semibold"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
