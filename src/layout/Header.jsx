import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import Login from "../pages/Login";
import { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import { useSelector, useDispatch } from "react-redux";
import CartPopup from "../pages/CartPopup";
import { LOAD_CART_FROM_STORAGE } from "../slice/card"
import { usePopup } from "../pages/PopupContext"; 

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cart = useSelector((state) => state.cart.item);
  const [totalQty, setTotalQty] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isPopupOpen, setIsPopupOpen } = usePopup();

  useEffect(() => {
    dispatch(LOAD_CART_FROM_STORAGE());
  }, [dispatch]);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotalQty(total);
  }, [cart]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  const handleClickProducts = () => {
    navigate('/ProductListing'); 
  };

  return (
    <div className="bg-white border-gray-200">
      <div className="flex justify-between items-center mx-auto gap-5 p-4">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-2/4 h-1/2" />
        </Link>
        <div className="w-[20%]">
          <h3 className="text-xl font-medium">Delivery in 8 minutes</h3>
          <h3 className="text-base font-light">Location</h3>
        </div>
        <div className="w-[30%]">
          <SearchBox />
        </div>

        {isLoggedIn ? (
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-xl font-medium">Account</button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg py-2">
                <Link to="/ProductListing" className="block px-4 py-2 hover:bg-gray-100">Product Listing</Link>
                <button onClick={handleLogout} className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Login setUserLoggedIn={setIsLoggedIn} />
        )}

        {/* ✅ Re-added "Products List" Navigation */}
        <div onClick={handleClickProducts} className="text-xl font-medium cursor-pointer">
          Products List
        </div>

        <button onClick={() => setIsPopupOpen(true)} className="text-white text-xl bg-green-700 hover:bg-blue-800 font-medium rounded-lg px-8 py-3">
          My Cart <span>({totalQty})</span>
        </button>
      </div>

      <CartPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}

export default Header;
