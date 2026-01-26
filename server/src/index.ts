import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { auditRouter } from './routes/audit.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Parse allowed origins from env (comma-separated) or use default
const allowedOrigins = process.env.SITE_URLS
  ? process.env.SITE_URLS.split(',').map(origin => origin.trim())
  : ['http://localhost:5173'];

// CORS configuration with multi-origin support
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc. in dev)
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.use(express.json());

// Rate limiting for audit endpoint (relaxed in dev mode for testing)
const isDev = process.env.NODE_ENV !== 'production';
const auditLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes default
  max: parseInt(process.env.RATE_LIMIT_MAX || (isDev ? '100' : '5'), 10), // 100 in dev, 5 in prod
  message: { success: false, error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes with rate limiting
app.use('/api', auditLimiter, auditRouter);

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err.message);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

// Start server with proper error handling
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ ERROR: Port ${PORT} is already in use.\n`);
    console.error('Possible causes:');
    console.error('  • Another instance of this server is already running');
    console.error('  • Another application is using this port');
    console.error('\nSuggested actions:');
    console.error(`  • Kill the process using port ${PORT}:`);
    console.error(`      Windows: netstat -ano | findstr :${PORT}`);
    console.error(`      Linux/Mac: lsof -i :${PORT}`);
    console.error(`  • Or set a different PORT in your .env file\n`);
    process.exit(1);
  } else {
    console.error('❌ Server failed to start:', err.message);
    process.exit(1);
  }
});
