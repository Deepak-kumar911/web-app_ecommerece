import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/apiInterceptor';

const initialCartId = localStorage.getItem('cartId');

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartId: initialCartId || null,
    cartAmt:0,
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const {cart,items} = action?.payload
      console.log("cart,items",cart,items,state?.items);
      
      state.cartId = cart?._id
      state.amount = cart?.amount
      localStorage.setItem('cartId', cart?._id); 
      items?.forEach((newItem) => {
        const index = state.items.findIndex((item) => item._id === newItem._id);
        if (index !== -1) {
          state.items[index] = newItem;
        } else {
          state.items.push(newItem);
        }
      });
    },
    removeFromCart: (state, action) => {
      const {cart,cartProductId} =action?.payload
      state.cartAmt = cart.amount
      state.items = state.items.filter(item => item._id !== cartProductId);
    },
    setCart: (state, action) => {
      const {_id,amount,cart_product} = action?.payload
      state.cartId = _id;
      state.cartAmt = amount;
      state.items = cart_product;
    },
    setCartId: (state, action) => {
      state.cartId = action.payload;
      localStorage.setItem('cartId', action.payload); // persist cartId
    },
  },
});

export const { addToCart, removeFromCart, setCart, setCartId } = cartSlice.actions;

export const addProductToCart = (payload) => async (dispatch, getState) => {
  try {
    let cartId = getState().cart.cartId;
    const res = await api.put(`/carts/${cartId}`, payload);
    console.log("addProductToCart",payload);
    
    dispatch(addToCart(res.data?.data)); 
  } catch (error) {
    console.error('Add to cart failed', error);
  }
};

export const getUserCartDetails = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/carts/user/${id}`);
    dispatch(setCart(res.data?.data)); 
  } catch (error) {
    console.error('getUserCartDetails failed', error);
  }
};

export const removeProductFromCart = (id) => async (dispatch, getState) => {
  try {
    const res = await api.delete(`/cart-product/${id}`);
    const updatedCart = res.data?.data;
    dispatch(removeFromCart(updatedCart));
  } catch (error) {
    console.error('Remove from cart failed', error);
  }
};


export default cartSlice.reducer;
