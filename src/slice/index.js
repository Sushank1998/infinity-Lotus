import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./card"; // FIX: Ensure correct filename

export const store = configureStore({
  reducer: {
    cart: cartReducer, // Register cart reducer properly
  }
});