import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/reducers/authSlice';
import productsReducer from '../redux/reducers/productSlice';
import cartReducer from '../redux/reducers/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  },
});
