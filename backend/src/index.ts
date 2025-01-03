import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import routes from './routes';
import path from 'path';

const prisma = new PrismaClient();
const app = express();
const port = parseInt(process.env.PORT || '4000', 10);

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Body parsing middleware
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes - all routes are prefixed with /api
app.use('/api', routes);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  console.error('Stack:', err.stack);
  
  // Ensure we're sending a proper JSON response
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const start = async () => {
  try {
    // Connect to database
    await prisma.$connect();
    console.log('Connected to database');

    // Start listening
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
      console.log(`API available at http://localhost:${port}/api`);
      console.log('Available routes:');
      console.log('  POST   /api/auth/register');
      console.log('  POST   /api/auth/login');
      console.log('  GET    /api/posts');
      console.log('  GET    /api/posts/:identifier');
      console.log('  POST   /api/posts          (admin)');
      console.log('  PUT    /api/posts/:id      (admin)');
      console.log('  DELETE /api/posts/:id      (admin)');
      console.log('  POST   /api/comments');
      console.log('  GET    /api/comments/all   (admin)');
      console.log('  PUT    /api/comments/:id   (admin)');
      console.log('  DELETE /api/comments/:id   (admin)');
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

// Handle shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

start();
