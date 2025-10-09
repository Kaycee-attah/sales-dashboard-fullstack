import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/database.js';
import salesRoutes from './routes/Sales.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:4200', // Angular dev server
    
    'https://your-frontend-domain.vercel.app' // your production frontend URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/sales', salesRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Sales Dashboard API is running!',
    version: '1.0.0'
  });
});

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error'
  });
});

// health check route 
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy and running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// keep-alive mechanism (optional but helpful)
const keepAlive = () => {
  setInterval(() => {
    console.log('🔄 Keep-alive - Server is active:', new Date().toISOString());
  }, 10 * 60 * 1000); // Log every 10 minutes
};
keepAlive();

app.listen(PORT, () => {
  console.log(`🚀 Professional Server running on http://localhost:${PORT}`);
  console.log('📊 Available endpoints:');
  console.log('   GET    /');
  console.log('   GET    /api/health');
  console.log('   GET    /api/sales');
  console.log('   POST   /api/sales');
  console.log('   GET    /api/sales/:id');
  console.log('   PUT    /api/sales/:id');
  console.log('   DELETE /api/sales/:id');
});