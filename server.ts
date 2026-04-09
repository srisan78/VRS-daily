import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

// --- Mock Databases for Services ---
const usersDB: any[] = [];
const productsDB = [
  { id: 1, name: 'Fresh Cow Milk', category: 'Milk', price: 60, unit: '1L', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Farm Fresh Curd', category: 'Curd', price: 40, unit: '500g', image: 'https://images.unsplash.com/photo-1628183141680-0a3a7891157b?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Pure Cow Ghee', category: 'Ghee', price: 600, unit: '1L', image: 'https://images.unsplash.com/photo-1648805778848-0e863111005a?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Soft Paneer', category: 'Paneer', price: 120, unit: '250g', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800' },
  { id: 5, name: 'Salted Butter', category: 'Butter', price: 55, unit: '100g', image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800' },
];
const ordersDB: any[] = [];
const paymentsDB: any[] = [];
const notificationsDB: any[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());  

  // ============================================================================
  // API GATEWAY & MICROSERVICES SIMULATION
  // In a real environment, these would be separate Docker containers/pods.
  // Here, we simulate them as modular Express routers.
  // ============================================================================

  // 1. User Service
  const userRouter = express.Router();
  userRouter.post('/register', (req, res) => {
    const user = { id: Date.now(), ...req.body };
    usersDB.push(user);
    res.json({ message: 'User registered successfully', user });
  });
  userRouter.post('/login', (req, res) => {
    // Mock JWT and Auth
    res.json({ token: 'mock-jwt-token-123', user: { id: 1, name: req.body.email || 'Test User', role: 'Customer' } });
  });
  app.use('/api/users', userRouter);

  // 2. Product Service
  const productRouter = express.Router();
  productRouter.get('/', (req, res) => {
    res.json(productsDB);
  });
  productRouter.get('/:id', (req, res) => {
    const product = productsDB.find(p => p.id === parseInt(req.params.id));
    product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
  });
  app.use('/api/products', productRouter);

  // 3. Order Service
  const orderRouter = express.Router();
  orderRouter.post('/', (req, res) => {
    const order = { id: Date.now(), status: 'pending', date: new Date().toISOString(), ...req.body };
    ordersDB.push(order);
    
    // Simulate internal call to Notification Service
    notificationsDB.push({ id: Date.now(), type: 'ORDER_CREATED', orderId: order.id });
    
    res.json({ message: 'Order created successfully', order });
  });
  orderRouter.get('/', (req, res) => {
    res.json(ordersDB);
  });
  app.use('/api/orders', orderRouter);

  // 4. Payment Service
  const paymentRouter = express.Router();
  paymentRouter.post('/', (req, res) => {
    const payment = { id: Date.now(), status: 'success', orderId: req.body.orderId, amount: req.body.amount };
    paymentsDB.push(payment);
    
    // Update order status
    const order = ordersDB.find(o => o.id === req.body.orderId);
    if (order) order.status = 'paid';

    // Simulate internal call to Notification Service
    notificationsDB.push({ id: Date.now(), type: 'PAYMENT_SUCCESS', orderId: req.body.orderId });

    res.json({ message: 'Payment processed successfully', payment });
  });
  app.use('/api/payments', paymentRouter);

  // 5. Notification Service
  const notificationRouter = express.Router();
  notificationRouter.get('/', (req, res) => {
    res.json(notificationsDB);
  });
  app.use('/api/notifications', notificationRouter);

  // ============================================================================
  // VITE MIDDLEWARE (Frontend Serving)
  // ============================================================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
