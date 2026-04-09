import { Link } from 'react-router-dom';
import { ShoppingCart, User, Milk } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export function Navbar() {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-emerald-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Milk className="h-8 w-8 text-emerald-200" />
            <span>VRS Dairy Farm</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-emerald-200 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-emerald-200 transition-colors">Products</Link>
            <Link to="/dashboard" className="hover:text-emerald-200 transition-colors">Orders</Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/login" className="hover:text-emerald-200 transition-colors">
              <User className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="relative hover:text-emerald-200 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
