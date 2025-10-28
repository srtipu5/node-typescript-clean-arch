import Redis from 'ioredis';
import { ICacheProvider } from '../interfaces/iCacheProvider';

export class RedisCacheProvider implements ICacheProvider {
  private client = new Redis();

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const data = JSON.stringify(value);
    ttl ? await this.client.setex(key, ttl, data) : await this.client.set(key, data);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
