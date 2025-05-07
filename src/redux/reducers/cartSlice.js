import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/apiInterceptor';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;

export const addProductToCart = (product) => async (dispatch) => {
  try {
    await api.post('/api/cart', { product });
    dispatch(addToCart(product));
  } catch (error) {
    console.error('Failed to add to cart', error);
  }
};

export default cartSlice.reducer;
