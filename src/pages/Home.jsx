import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import homeImg from "../assets/homeimg.webp";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); 


  const handleSubmitProducts = ()=>{
    console.log("clicked")
    navigate("/ProductListing")
    
  }
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleClick = (productId) => {
    navigate(`/product/${productId}`); 
  };

  return (
    <div>
      <img src={homeImg} alt="home" className="cursor-pointer" onClick={handleSubmitProducts} />
      <div className=" flex flex-wrap justify-center gap-5">
        {data.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="cursor-pointer flex flex-col justify-center  max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
          >
            <img className="rounded-t-lg w-48 h-48 object-fill "  src={item.image} alt={item.title} />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{item.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
