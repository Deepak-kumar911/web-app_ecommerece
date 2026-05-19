import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productSlice';
import { addProductToCart } from '../../redux/reducers/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './Loader';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.products);
  const auth = useSelector((state) => state.auth);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    
    if (!auth?.token) {
      navigate('/user/login');
      return;
    }
    
    if (auth?.role === 'admin') {
      toast.error('Please login with a user account');
      return;
    }
    
    dispatch(
      addProductToCart({
        userId: auth?._id,
        date: new Date(),
        products: [
          {
            _id: product?._id,
            price: product?.price,
            title: product?.title,
            image: product?.image,
            quantity: 1,
          },
        ],
      })
    );
    toast.success('Added to cart!');
  };

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 mb-4">Oops!</p>
          <p className="text-lg text-gray-600">Products are currently unavailable</p>
        </div>
      </div>
    );

  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Our Collection
          </h1>
          <p className="text-lg text-gray-600">
            Discover our premium selection of products handpicked for you
          </p>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="group h-full"
              onMouseEnter={() => setHoveredId(product._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col transform hover:scale-105 hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative bg-gray-200 overflow-hidden h-56 sm:h-64">
                  <img
                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay with Quick Action */}
                  <div
                    className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredId === product._id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transform transition-transform hover:scale-110 flex items-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m10 0l2 8m-12 0h12"
                        />
                      </svg>
                      Add to Cart
                    </button>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {product?.category?.slice(0, 8)}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  {/* Product Title */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                      {product?.title?.slice(0, 50)}
                      {product?.title?.length > 50 ? '...' : ''}
                    </h3>

                    {/* Rating or Status */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < 4 ? 'fill-current' : 'fill-gray-300'
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">(128)</span>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="border-t pt-3">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ${product?.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${(product?.price * 1.2).toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 font-semibold">
                      Save ${(product?.price * 0.2).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Footer with In Stock Badge */}
                <div className="bg-gray-50 px-4 py-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      In Stock
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p className="text-xl font-semibold text-gray-600">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
