import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Leaf } from 'lucide-react';

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1529312266912-b33cfce2eefd?auto=format&fit=crop&q=80&w=2000" 
            alt="Dairy Farm" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Farm Fresh Dairy,<br />Delivered to Your Door.
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mb-10">
            Experience the purity of nature with VRS Dairy Farm. We bring you 100% organic, fresh milk and dairy products straight from our farm to your family.
          </p>
          <div className="flex gap-4">
            <Link to="/products" className="bg-white text-emerald-800 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors flex items-center gap-2">
              Shop Now <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">100% Organic</h3>
              <p className="text-gray-600">Our cows are grass-fed and raised without artificial hormones or antibiotics.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Daily Delivery</h3>
              <p className="text-gray-600">Subscribe for daily morning deliveries right to your doorstep.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Quality Assured</h3>
              <p className="text-gray-600">Rigorous testing ensures you get the safest and highest quality dairy.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
