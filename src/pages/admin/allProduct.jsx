import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminDeleteProductByIdApi, adminGetAllProductApi } from '../../utils/apiEndPoints';
import debounce from 'lodash.debounce';
import Loader from '../../components/common/Loader';
import { toast } from 'react-toastify';

const AdminAllProduct = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [deleteProduct,setDeleteProduct] = useState({_id:null,loading:false})
    const limit = 10;
    const navigate = useNavigate();

    const fetchProducts = async (query = '', page = 1) => {
        if (query && query.length < 3) return;
        setLoading(true)
        try {
            const res = await adminGetAllProductApi(page, limit, query);
            const data = res?.data?.data || [];
            const total = res?.data?.total || data.length;
            setProducts(data);
            setTotalPages(Math.ceil(total / limit));
            setLoading(false)
        } catch (err) {
            console.error('Fetch failed:', err);
            toast.error(err?.response?.message || "Something went wrong")
        }
    };

    const debouncedFetch = useCallback(
        debounce((q) => {
            fetchProducts(q, 1);
            setCurrentPage(1);
        }, 500),
        []
    );

    useEffect(() => {
        debouncedFetch(search);
    }, [search]);

    const deleteProductById = async(_id)=>{
        setDeleteProduct({_id,loading:true})
        try {
            const res = await adminDeleteProductByIdApi(_id);
            if(res?.status==200 && res?.data?.status==1){
                toast.success(res?.data?.message)
                fetchProducts()
            }
        } catch (err) {
            console.error('Fetch failed:', err);
            toast.error(err?.response?.message || "Something went wrong")
        }
        setDeleteProduct({_id:null,loading:false})
    }


    useEffect(() => {
        fetchProducts(search, currentPage);
    }, [currentPage]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Admin – All Products</h2>

            {loading ? <div className="flex justify-center items-center w-full h-screen"><Loader /></div>
 :
                <div>
                    <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full sm:w-1/2 border px-4 py-2 rounded shadow"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            onClick={() => navigate('/admin/add-product')}
                        >
                            + Add New
                        </button>
                    </div>

                    {/* Product Table */}
                    <div className="overflow-x-auto bg-white rounded shadow">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-100 text-left">
                                <tr>
                                    <th className="p-3 font-semibold">Title</th>
                                    <th className="p-3 font-semibold">Price</th>
                                    <th className="p-3 font-semibold">Category</th>
                                    <th className="p-3 font-semibold">Stock</th>
                                    <th className="p-3 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-6 text-gray-500">No products found.</td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product._id} className="border-t hover:bg-gray-50">
                                            <td className="p-3">{product.title}</td>
                                            <td className="p-3">${product.price}</td>
                                            <td className="p-3">{product.category}</td>
                                            <td className="p-3">{product.stock}</td>
                                            <td className="p-3">
                                                <Link to={`/admin/edit-product/${product?._id}`} className="text-blue-600 hover:underline mr-2">Edit</Link>
                                                <button onClick={()=>deleteProductById(product?._id)} disabled={deleteProduct?.loading} className="text-red-500 hover:underline">{(deleteProduct?._id==product?._id && deleteProduct?.loading) ? <Loader size={20}/> : "Delete"} </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-8 space-x-2">
                        <button
                            className="px-4 py-2 border rounded disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className="px-4 py-2 border rounded disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>}
        </div>
    );
};

export default AdminAllProduct;
