import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  item: [],
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
    },
  },
});

export const { ADD_TO_CART } = cartSlice.actions;
export default cartSlice.reducer;
