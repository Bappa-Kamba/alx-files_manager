const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    // Handle connection errors
    this.client.on('error', (err) => {
      console.error('Redis error:', err);
    });
  }

  isAlive() {
    return new Promise((resolve) => {
      this.client.ping((err, response) => {
        if (err) {
          resolve(false);
        } else {
          resolve(response === 'PONG');
        }
      });
    });
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}
const redisClient = new RedisClient();

module.exports = { redisClient };
