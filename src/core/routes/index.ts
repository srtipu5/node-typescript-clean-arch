import { Router } from 'express';
import { sendData } from '../utils';

const router = Router();
// Root info
router.get('/', (_, res) => {
  sendData(res, {
    service: 'Price Estimator Backend',
    version: '1.0.0',
    description: 'Lightweight backend that proxies AI/ML operations to external services',
    endpoints: {
      health: '/health',
      ai_proxy: '/api/predict-fees',
      onedrive_proxy: '/api/onedrive/projects',
    },
  });
  return;
});

// Health check
router.get('/health', (_, res) => {
  sendData(res, { 'service-status': 'healthy', service: 'Price Estimator Backend' });
});

export default router;
