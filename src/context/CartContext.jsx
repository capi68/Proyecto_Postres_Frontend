import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persistir en localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart_v1", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // helpers
  const getTotalItems = () => cart.reduce((s, it) => s + (it.qty || 0), 0);
  const getTotalPrice = () =>
    cart.reduce((s, it) => s + (parseFloat(it.price || 0) * (it.qty || 0)), 0);

  // Add to cart (si existe incrementa qty)
  function addToCart(product, qty = 1) {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: (p.qty || 0) + qty } : p
        );
      }
      // guardamos campo price como número/string que venga del back
      return [...prev, { ...product, qty }];
    });
  }

  function updateQuantity(productId, qty) {
    if (qty <= 0) {
      // eliminar si qty <= 0
      setCart((prev) => prev.filter((p) => p.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, qty } : p))
    );
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
