import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/reducers/productSlice';
import { addProductToCart } from '../../redux/reducers/cartSlice';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Products = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  if (loading) return <div className="flex justify-center items-center w-full h-screen"><Loader /></div>;
  if (error) return <div className="flex justify-center items-center w-full h-screen">Products is un-available</div>;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {items.map((product) => (
        <Link to={`/product/${product._id}`} key={product._id} className=" shadow-blue-300  hover:scale-105 rounded shadow-md">
          <img src={product?.image} alt={product?.title} className="w-full h-48 object-contain rounded mb-4" />
          <div className='p-4'>
          <h3 className="text-md">{product?.title?.slice(0,40)} ...</h3>
          <h3 className="text-md mt-2">Category: <span className='font-semibold'>{product?.category}</span></h3>
          <p className="font-bold mt-2">${product?.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
