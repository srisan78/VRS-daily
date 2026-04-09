import { useEffect, useState } from 'react';
import { Package, Bell } from 'lucide-react';

export function Dashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    // Fetch orders from Order Service
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data.reverse()));

    // Fetch notifications from Notification Service
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data.reverse()));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="h-5 w-5 text-emerald-600" /> Recent Orders
          </h2>
          
          {orders.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
              No orders found.
            </div>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order #{order.id}</p>
                    <p className="text-xs text-gray-400">{new Date(order.date).toLocaleString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-medium text-gray-900">Total: ₹{order.total}</p>
                  <p className="text-sm text-gray-600 mt-1">{order.items?.length || 0} items</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Bell className="h-5 w-5 text-emerald-600" /> Notifications
          </h2>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No notifications.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map(notif => (
                  <div key={notif.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <p className="text-sm font-medium text-gray-900">
                      {notif.type === 'ORDER_CREATED' && 'Order Placed Successfully'}
                      {notif.type === 'PAYMENT_SUCCESS' && 'Payment Received'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Ref: #{notif.orderId}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
