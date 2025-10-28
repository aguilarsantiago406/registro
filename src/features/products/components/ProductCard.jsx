import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link 
      to={`/products/${product.id}`} 
      className="border p-4 rounded-lg shadow hover:shadow-xl transition-shadow flex flex-col"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain mb-4"
      />
      <div className="flex-grow">
        <h2 className="text-lg font-bold truncate" title={product.title}>
          {product.title}
        </h2>
        <p className="text-gray-600 text-sm">{product.category}</p>
      </div>
      <p className="text-xl font-semibold mt-2">${product.price}</p>
    </Link>
  );
}