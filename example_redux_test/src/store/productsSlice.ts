import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "productsSlice",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct(state, action) {
      state.products.push({
        id: new Date().toISOString(),
        text: action.payload,
        isBuy: false,
      });
    },
    markProductAsBuy(state, action){
        const product = state.products.find(p=>p.id ===action.payload);
        product.isBuy= !product.isBuy;
    },
    deleteProduct(state, action){
state.products=state.products.filter(p=>p.id !==action.payload)
    }
  },
});

export const { addProduct, markProductAsBuy,deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
