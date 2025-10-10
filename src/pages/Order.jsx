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
          onClick={() => navigate("/")}
          className="bg-[var(--color-brand)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--color-brand-dark)]"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-vanilla)] flex flex-col items-center p-6">
      <NavBar />

      {/* Voucher */}
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md mt-10 p-6 border border-dashed border-[var(--color-chocolate)]">
        <h1 className="text-3xl font-bold text-center text-[var(--color-chocolate)] mb-4">
          ¡Gracias por tu compra!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Tu pedido ha sido registrado con éxito. 🎉
        </p>

        {/* Order Info */}
        <div className="text-sm text-gray-700 mb-6">
          <p><strong>ID de orden:</strong> {order.id}</p>
          <p><strong>Dirección:</strong> {order.address}</p>
          <p><strong>Método de pago:</strong> {order.paymentMethod}</p>
          <p><strong>Estado:</strong> {order.status}</p>
          <p><strong>Total:</strong> ${parseFloat(order.totalPrice).toFixed(2)}</p>
        </div>

        <hr className="my-4 border-dashed border-gray-300" />

        {/* Order Items */}
        <h2 className="text-lg font-semibold text-[var(--color-chocolate)] mb-3">
          Detalles del pedido
        </h2>
        <div className="space-y-3">
          {orderItems.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center border-b border-gray-100 pb-2"
            >
              <span className="text-gray-800">{item.product?.name || `Producto #${item.productId}`}</span>
              <span className="text-gray-600 text-sm">
                {item.quantity} x ${parseFloat(item.price).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white px-6 py-3 rounded-lg font-semibold"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
