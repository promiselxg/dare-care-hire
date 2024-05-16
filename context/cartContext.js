"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isloading, setLoading] = useState(false);
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = window.localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } else {
      return [];
    }
  });

  const addItemToCart = async (item) => {
    setLoading(true);
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const updatedCart = [...cart];
    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex] = item;
    } else {
      updatedCart.push(item);
    }
    setCart(updatedCart);
    setLoading(false);
    return { message: "Item added to cart successfully!" };
  };

  const removeItemFromCart = (index) => {
    setLoading(true);
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, addItemToCart, removeItemFromCart, isloading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
