import { useSelector } from "react-redux";

function CartPopup({ isOpen, onClose }) {
  const cart = useSelector((state) => state.cart.item);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 w-96 rounded-lg relative shadow-lg">
        <h2 className="text-xl font-bold mb-4">My Cart</h2>
        <button className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full p-2" onClick={onClose}>✖</button>

        {cart.length > 0 ? (
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex items-center border-b py-2 gap-4">
                <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-md" />
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
