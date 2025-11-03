import { Express } from 'express';
import { sendData } from '../core/utils';
import microsoftRoutes from '../modules/auth/http/controllers';
import aiRoutes from '../modules/ai/http/controllers';

export function initRoutes(app: Express) {
  app.get('/', (_, res) => {
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
  app.get('/health', (_, res) => {
    sendData(res, { 'service-status': 'healthy', service: 'Price Estimator Backend' });
  });

  app.use('/ms', microsoftRoutes); // microsoft routes
  app.use('/api/ai', aiRoutes); // ai routes
}
