import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../slice/card";
import { usePopup } from "../pages/PopupContext"; 

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const cart = useSelector((state) => state.cart.item);
  const dispatch = useDispatch();
  const { setIsPopupOpen } = usePopup(); 

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (isMounted) {
          setProduct(res.data);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddtoCart = () => {
    if (!product) return;

    const existingItem = cart.find((item) => item.id === product.id);
    if (!existingItem) {
      dispatch(ADD_TO_CART({ ...product, quantity: 1 }));
    } else {
      dispatch(ADD_TO_CART({ ...existingItem, quantity: existingItem.quantity + 1 }));
    }

    setIsPopupOpen(true);
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <div className="flex gap-20">
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
