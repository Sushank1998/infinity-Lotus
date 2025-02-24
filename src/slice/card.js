import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: JSON.parse(localStorage.getItem("cart")) || [], // Load cart from localStorage
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.item.findIndex(item => item.id === action.payload.id);
      if (existingIndex >= 0) {
        state.item[existingIndex].qty += 1; // Increase quantity if item exists
      } else {
        state.item.push({ ...action.payload, qty: 1 }); // Add new item
      }
      localStorage.setItem("cart", JSON.stringify(state.item)); // Save to localStorage
    }
  }
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
