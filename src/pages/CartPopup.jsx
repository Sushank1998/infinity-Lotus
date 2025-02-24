import { useSelector } from "react-redux";

function CartPopup({ isOpen, onClose }) {
  const cart = useSelector((state) => state.cart.item);

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="bg-white p-5 w-96 mx-auto mt-20 rounded-lg">
        <h2 className="text-xl font-bold">My Cart</h2>
        <button className="absolute top-2 right-2" onClick={onClose}>✖</button>
        
        {cart.length > 0 ? (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b py-2">
                <img src={item.image} alt={item.title} className="w-12 h-12" />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p>₹{item.price} × {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default CartPopup;
