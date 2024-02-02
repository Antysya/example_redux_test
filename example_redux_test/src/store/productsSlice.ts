import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {store} from "./"

const productsSlice = createSlice({
  name: "productsSlice",  
  initialState: {
    products: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addProduct(state, action) {
      state.products.push({
        id: new Date().toISOString(),
        title: action.payload,
        complate: false,
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
  extraReducers: (bulder) => {
    bulder.addCase(getProducts.pending, (state)=> {
      state.isLoading=true;
    });
    bulder.addCase(getProducts.fulfilled, (state, action)=> {
      state.products = action.payload;
      state.isLoading=false;
      state.error = null;

    });  
    bulder.addCase(getProducts.rejected, (state, action)=> {
      state.error = action.payload;
      state.isLoading=false;
    });      
  },
});

export const getProducts = createAsyncThunk(
  "productsSlice/getProducts",
  async function (_, { rejectWithValue }) {
    try {
      const count = store.getState().settings.itemsPerPage;
 
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_limit=${count}`
      );
 
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const { addProduct, markProductAsBuy,deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
