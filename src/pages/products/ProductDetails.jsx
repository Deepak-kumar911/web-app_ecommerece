import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProductToCart, removeFromCart, removeProductFromCart } from '../../redux/reducers/cartSlice';
import { userGetProductByIdApi } from '../../utils/apiEndPoints';
import { toast } from 'react-toastify';
import Loader from '../../components/common/Loader';


const ProductDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { items: cartItems,cardId,cartAmt } = useSelector((state) => state.cart);
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const navigate =useNavigate()
    console.log("cart",cartItems);
    
    const cartProduct = cartItems.find((item) => item?.productId == id);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState(null);
    const [allImg, setAllImg] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await userGetProductByIdApi(id);
                const data = response.data?.data
                setProduct(data);
                setMainImage(data?.image);
                setAllImg([data?.image, ...data?.images])
                setLoading(false);
            } catch (err) {
                toast.error(err?.response?.message)
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const handleAddToCart = () => {
        if(auth?.token && auth?.role=="admin"){
            toast.error("Please login with user account")
            return
        }
        if(!auth?.token){
            navigate("/user/login")
            return
        }
        if (product) {
            dispatch(addProductToCart({userId:auth?._id,date:new Date(),products:[{_id:product?._id,price:product?.price,title:product?.title,image:product?.image, quantity: 1 }]}));
        }
    };

    const handleIncreaseQuantity = () => {
        if(auth?.token && auth?.role=="admin"){
            toast.error("Please login with user account")
            return
        }
        if(!auth?.token){
            navigate("/user/login")
            return
        }

        dispatch(addProductToCart({userId:auth?._id,date:new Date(),products:[{_id:product?._id,price:product?.price,title:product?.title,image:product?.image, quantity: cartProduct?.quantity + 1 }]}));
    };

    const handleDecreaseQuantity = () => {
        if(auth?.token && auth?.role=="admin"){
            toast.error("Please login with user account")
            return
        }
        if(!auth?.token){
            navigate("/user/login")
            return
        }
        if (cartProduct.quantity > 1) {
            dispatch(addProductToCart({userId:auth?._id,date:new Date(),products:[{_id:product?._id,title:product?.title,image:product?.image,price:product?.price, quantity: cartProduct?.quantity - 1 }]}));
        }
    };

       const handleRemoveItem = (itemId) => {
          dispatch(removeProductFromCart(itemId));
        };
      

    if (loading) return <div className="flex justify-center items-center w-full h-screen"><Loader /></div>;
    if (!product) return <div className="flex justify-center items-center w-full h-screen">Product is un-available</div>;

    console.log("cartProduct",cartProduct,product);
    

    return (
        <div className="p-8 bg-gray-50">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <div className="relative">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-96 object-contain rounded-xl shadow-lg"
                        />
                    </div>
                    <div className="flex space-x-4 overflow-x-auto">
                        {allImg?.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer transform hover:scale-110 transition duration-200"
                                onClick={() => setMainImage(image)}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h1 className="text-2xl font-extrabold text-gray-800">{product.title}</h1>
                    <p className="text-md text-gray-600">{product.description}</p>
                    <p className="text-2xl font-bold text-blue-600">${product.price}</p>

                    {cartProduct ? (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleDecreaseQuantity}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:opacity-50"
                                    disabled={cartProduct.quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="text-xl">{cartProduct.quantity}</span>
                                <button
                                disabled={cartProduct?.quantity==product?.quantity}
                                    onClick={handleIncreaseQuantity}
                                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                                >
                                    +
                                </button>
                            </div>
                            <button
                    onClick={() => handleRemoveItem(cartProduct._id)}
                    className="bg-red-500 text-white my-5 px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;

