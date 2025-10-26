import { Router } from 'express';

const router = Router();
// Root info
router.get('/', (_, res) => {
  res.send({
    service: 'PE PriceEstimator.ai - Simplified Backend',
    version: '1.0.0',
    description: 'Lightweight backend that proxies AI/ML operations to external services',
    endpoints: {
      ai_proxy: '/api/predict-fees',
      onedrive_proxy: '/api/onedrive/projects',
      health: '/health',
    },
  });
});

// Health check
router.get('/health', (_, res) => {
  res.send({ status: 'healthy', service: 'simplified-backend' });
});

export default router;
