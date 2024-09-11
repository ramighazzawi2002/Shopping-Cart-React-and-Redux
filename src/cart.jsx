import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, updateItemQuantity } from "./store/slice";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

export default function Cart() {
  const cartItems = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateItemQuantity({ id: productId, quantity: newQuantity }));
    }
  };

  const handleDeleteItem = productId => {
    dispatch(deleteItem(productId));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Shopping Cart</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingCart size={64} className="text-gray-400 mb-4" />
          <p className="text-xl text-gray-600">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h2>
      {cartItems.map(item => (
        <div
          key={item.id}
          className="flex items-center py-4 border-b border-gray-200"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-20 h-20 object-cover rounded-md mr-4"
          />
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <Minus size={20} className="text-gray-600" />
            </button>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={e =>
                handleUpdateQuantity(item.id, parseInt(e.target.value))
              }
              className="w-12 text-center mx-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <Plus size={20} className="text-gray-600" />
            </button>
          </div>
          <button
            onClick={() => handleDeleteItem(item.id)}
            className="ml-4 p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-200"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
      <div className="mt-6 text-right">
        <h3 className="text-xl font-bold text-gray-800">
          Total: ${total.toFixed(2)}
        </h3>
      </div>
    </div>
  );
}
