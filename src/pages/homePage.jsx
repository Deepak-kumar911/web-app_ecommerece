import React from 'react';
import Products from '../components/common/Products';

const HomePage = () => {
  return (
    <div className="">
      <section className="bg-blue-50 flex-1">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome to ShopifyX</h2>
          <p className="text-lg text-gray-600 mb-6">Discover amazing products at unbeatable prices</p>
         
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Featured Products</h3>
        <Products/>
      </section>


    </div>
  );
};

export default HomePage;
