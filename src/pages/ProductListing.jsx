import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductListing() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate()
  console.log("data",product);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false); 
        console.log("data",product);
        console.log("data",res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false); 
      });
  },); 
  const handleClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to product page
  };
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">Product Listing</h1>

    
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg font-medium">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.map((item) => (
            <div
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="cursor-pointer bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300 p-4"
            >
              <img
                className="rounded-t-lg w-full h-48 object-fill"
                src={item.image}
                alt={item.title}
              />
              <div className="p-3">
                <h5 className="mb-2 text-lg font-semibold text-gray-900">
                  {item.title.length > 40 ? item.title.substring(0, 40) + "..." : item.title}
                </h5>
                <p className="text-gray-700 font-bold">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListing;
