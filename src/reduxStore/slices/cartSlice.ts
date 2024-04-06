"use client";
import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/reduxStore/stores/store";

const initialState: any = {
  data:
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("cartData") || "[]")
      : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const addedProduct = state.data.find(
        (val: any) => val.id === payload.product.id
      );
      if (addedProduct) {
        const updatedProducts = state.data.map((val: any) => {
          if (val.id === payload.product.id && val.quantity) {
            return { ...val, quantity: val.quantity + payload.qty };
          } else {
            return val;
          }
        });
        localStorage.setItem("cartData", JSON.stringify(updatedProducts));
        return { ...state, data: updatedProducts };
      } else {
        const newProduct = { ...payload.product, quantity: payload.qty };
        const updatedData = [...state.data, newProduct];
        localStorage.setItem("cartData", JSON.stringify(updatedData));
        return { ...state, data: updatedData };
      }
    },
    removeFromCart: (state, { payload }) => {
      const updatedProducts = state.data.filter(
        (val: any) => +val.id !== +payload.id
      );
      localStorage.setItem("cartData", JSON.stringify(updatedProducts));
      return { ...state, data: updatedProducts };
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

export const cartSelector = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.cart
);
