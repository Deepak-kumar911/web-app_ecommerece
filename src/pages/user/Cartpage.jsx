import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, removeFromCart, removeProductFromCart } from '../../redux/reducers/cartSlice';

const CartPage = () => {
   const dispatch = useDispatch();
   const cartItems = useSelector((state) => state.cart.items);
   const cartAmt = useSelector((state) => state.cart.cartAmt);
   const auth = useSelector((state) => state.auth);


   const handleIncreaseQuantity = (product) => {
      if (auth?.token && auth?.role == "admin") {
         toast.error("Please login with user account")
         return
      }
      if (!auth?.token) {
         navigate("/user/login")
         return
      }
      dispatch(addProductToCart({ userId: auth?._id, date: new Date(), products: [{ _id: product?.productId,title: product?.title,image: product?.image,  price: product?.price, quantity: product?.quantity + 1 }] }));
   };

   const handleDecreaseQuantity = (product) => {
      if (auth?.token && auth?.role == "admin") {
         toast.error("Please login with user account")
         return
      }
      if (!auth?.token) {
         navigate("/user/login")
         return
      }
      if (product?.quantity > 1) {
         dispatch(addProductToCart({ userId: auth?._id, date: new Date(), products: [{ _id: product?.productId,title: product?.title,image: product?.image, price: product?.price, quantity: product?.quantity - 1 }] }));
      }
   };

   const handleRemoveItem = (itemId) => {
      dispatch(removeProductFromCart(itemId));
    };
  

   return (
      <div className="max-w-4xl mx-auto p-4">
         <h1 className="text-4xl font-bold mb-6">Your Cart</h1>

         {cartItems.length === 0 ? (
            <p className="text-lg text-gray-500">Your cart is empty.</p>
         ) : (
            <div>
               {cartItems.map((item) => (
                  <div key={item._id} className="flex bg-white shadow-md mb-6 p-4 rounded-lg">
                     <div className="w-36 h-36 bg-gray-200 rounded-md overflow-hidden">
                        <img
                           src={item.image}
                           alt={item.title}
                           className="w-full h-full object-cover"
                        />
                     </div>

                     <div className="flex-1 pl-4">
                        <h2 className="text-xl font-semibold">{item.title}</h2>
                        <p className="text-lg text-gray-500">${item.price}</p>

                        <div className="flex items-center space-x-4 mt-4">
                           <div className="flex items-center space-x-2">
                              <div>
                              <label htmlFor={`quantity-${item._id}`} className="text-sm">Quantity</label>
                                 <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                       <button
                                          onClick={() => handleDecreaseQuantity(item)}
                                          className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
                                          disabled={item.quantity <= 1}
                                       >
                                          -
                                       </button>
                                       <span className="text-xl">{item.quantity}</span>
                                       <button
                                          // disabled={item?.quantity == product?.quantity}
                                          onClick={() => handleIncreaseQuantity(item)}
                                          className="px-4 py-2 bg-green-500 text-white rounded-lg"
                                       >
                                          +
                                       </button>
                                    </div>
                                 </div>
                                 <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="bg-red-500 text-white my-5 px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         )}

      </div>
   );
};

export default CartPage;
