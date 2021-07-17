import rateLimit from 'express-rate-limit';

export const rateLimitMiddleware = rateLimit({
  windowMs: 60000,
  max: 20,
  message: 'Too many requests this IP. Please try again in 1 minute'
});
