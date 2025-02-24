import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";
import Login from "../pages/Login";
import { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import { useSelector } from "react-redux";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalQty, setQty] = useState(0);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };
  const cart = useSelector((state) => state.cart.item);

  useEffect(() => {
    let total = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
    setQty(total);
  }, [cart]);

  return (
    <div className="bg-white border-gray-200">
      <div className="flex  justify-between items-center mx-auto gap-10 p-4">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-2/4 h-1/2" />
        </Link>
        <div className="w-[20%]">
          <h3 className="text-xl font-medium">Delivery in 8 minutes</h3>
          <h3 className="text-base font-light">loation</h3>
        </div>
        <div className="w-[50%]">
          <SearchBox />
        </div>
        {isLoggedIn ? (
          <>
            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-xl font-medium"
              >
                Account
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg py-2">
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/saved"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Saved Data
                  </Link>
                  <Link
                    to="/egift"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    E-Gift
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Login setUserLoggedIn={setIsLoggedIn} />
        )}
        <div></div>
        <div>
          <button className="text-white text-xl bg-green-700 hover:bg-blue-800 font-medium rounded-lg px-8 py-3">
            My Cart <span>({totalQty})</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
