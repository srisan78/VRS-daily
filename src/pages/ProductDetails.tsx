import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCartStore, Product } from '../store/cartStore';
import { ShoppingBag, ArrowLeft, ShieldCheck, Truck, Leaf } from 'lucide-react';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <Link to="/products" className="text-emerald-600 hover:text-emerald-700 font-medium">
          &larr; Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/products" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
      </Link>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="bg-gray-100 h-full min-h-[400px]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="text-sm font-bold text-emerald-600 uppercase tracking-wider mb-2">
              {product.category}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-lg text-gray-500 mb-1">per {product.unit}</span>
            </div>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Experience the finest quality {product.name.toLowerCase()} straight from our farm. 
              Our products are 100% natural, free from preservatives, and delivered fresh to ensure 
              the best taste and health benefits for you and your family.
            </p>

            <button
              onClick={() => addItem(product)}
              className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 mb-8 shadow-sm hover:shadow-md"
            >
              <ShoppingBag className="h-5 w-5" /> Add to Cart
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-8">
              <div className="flex flex-col items-center text-center">
                <Leaf className="h-6 w-6 text-emerald-500 mb-2" />
                <span className="text-xs font-medium text-gray-600">100% Organic</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="h-6 w-6 text-emerald-500 mb-2" />
                <span className="text-xs font-medium text-gray-600">Fresh Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="h-6 w-6 text-emerald-500 mb-2" />
                <span className="text-xs font-medium text-gray-600">Quality Assured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
