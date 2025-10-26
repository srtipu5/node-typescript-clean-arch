import { config } from './config/env';
import { connectDB } from './config/database';
import app from './app';

(async () => {
  await connectDB();
  app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
})();
