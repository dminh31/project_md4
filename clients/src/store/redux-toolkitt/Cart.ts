import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import publicAxios from "../../config/publicAxios";

interface CartState {
  cart: Cart[];
}
interface Cart {
  cart: {
    cartId: number;
    productId:number;
    userId:number,
    quantity: number;
  };
}
export const getCart: any = createAsyncThunk("cart/getCart", async (id: number) => {
  const data = await publicAxios.get(`/api/v1/cart/${id}`);
  console.log("day la kieu tra ve",data.data)
  return data.data;
});


const initialState: CartState = {
  cart: [],
};

const cartSliceder = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder:any) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getCart.fulfilled, (state:any, action:any) => {
        // Add user to the state array
        state.cart = action.payload; // gan lai cho state ban dau
      })
  },
});

export default cartSliceder.reducer;