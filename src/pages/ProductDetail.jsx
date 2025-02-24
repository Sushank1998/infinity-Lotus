import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


function ProductDetail() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  const cart = useSelector((state) => state.cart.item);
  console.log(cart)

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);


  const handleAddtoCart = () => {
    if (!product) return;
  
    // Dispatch Redux action
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: 1 } });
  
    // Update local storage
    setTimeout(() => {
      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      
      // Check if product already exists
      const existingItemIndex = updatedCart.findIndex((item) => item.id === product.id);
      if (existingItemIndex >= 0) {
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }
  
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }, 500);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-5">
        <div className="flex gap-20 ">
      <img className="w-full h-96 object-cover rounded-lg" src={product.image} alt={product.title} />
      <div>
      <h2 className="text-3xl font-bold mt-4">{product.title}</h2>
      <p className="text-lg text-gray-700 mt-2">{product.description}</p>
      <p className="text-2xl font-bold text-blue-600 mt-4">${product.price}</p>

      <button onClick={handleAddtoCart}
       className="px-6 py-3 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
        Add to Cart
      </button>
      </div>
        </div>
      
    </div>
  );
}

export default ProductDetail;
