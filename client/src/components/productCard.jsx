import { useState } from "react";

export default function ProductCard({ product, onOrder }) {
  const [quantity, setQuantity] = useState(1);

  const handleOrder = () => {
    const orderData = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      total: product.price * quantity,
    };

    onOrder(orderData);
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 mx-auto object-contain"
      />

      <h3 className="mt-3 font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.size}</p>

      <p className="mt-2 font-bold text-blue-600">KES {product.price}</p>

      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-1 border rounded"
        >
          −
        </button>

        <span className="w-6 text-center">{quantity}</span>

        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-1 border rounded"
        >
          +
        </button>
      </div>

      <button
        onClick={handleOrder}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
      >
        Order
      </button>
    </div>
  );
}
