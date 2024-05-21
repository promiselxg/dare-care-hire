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
    try {
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
      return { message: "Item added to cart successfully!" };
    } catch (error) {
      console.error(error);
      return { message: "Error adding item to cart" };
    }
  };

  const removeItemFromCart = (itemId) => {
    setLoading(true);
    const newCart = cart.filter((item) => item.id !== itemId);
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
      value={{ cart, addItemToCart, removeItemFromCart, isloading, setLoading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
