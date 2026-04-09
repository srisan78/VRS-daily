import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore, Product } from '../store/cartStore';
import { ShoppingBag } from 'lucide-react';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Fresh Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
            <div className="aspect-w-4 aspect-h-3 bg-gray-200">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">
                {product.category}
              </div>
              <Link to={`/products/${product.id}`} className="text-lg font-bold text-gray-900 mb-2 hover:text-emerald-600 block transition-colors">
                {product.name}
              </Link>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                <span className="text-sm text-gray-500">per {product.unit}</span>
              </div>
              <button
                onClick={() => addItem(product)}
                className="w-full bg-emerald-600 text-white py-2 rounded-xl font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
