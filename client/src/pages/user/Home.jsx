import ProductCard from "../../components/ProductCard";

export default function Home() {
  const products = [
    {
      id: "prod_20l",
      name: "20L Water Dispenser Bottle",
      size: "20 Litres",
      price: 450,
      image: "/images/20l-water.png",
    },
  ];

  const handleOrder = (orderData) => {
    console.log("ORDER PAYLOAD:", orderData);

    // next step: send this to backend
    // api.post("/orders", orderData)
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">MajiExpress</h1>
      <p className="text-gray-600 mb-6">Clean water delivered to your door</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOrder={handleOrder}
          />
        ))}
      </div>
    </div>
  );
}
