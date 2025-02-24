import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const { id, title, price, image } = action.payload;
      const existingItem = state.item.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.item.push({ id, title, price, image, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.item)); 
    },

    LOAD_CART_FROM_STORAGE(state) {
      state.item = JSON.parse(localStorage.getItem("cart")) || [];
    }
  },
});

export const { ADD_TO_CART, LOAD_CART_FROM_STORAGE } = cartSlice.actions;
export default cartSlice.reducer;
