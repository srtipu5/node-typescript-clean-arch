import { config, connectDB } from './config';
import app from './app';

(async () => {
  await connectDB();
  app.listen(config.PORT, () => console.log(`Server running on port ${config.PORT}`));
})();
