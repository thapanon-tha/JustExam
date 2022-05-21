const redis = require('redis');

let redisClient = null;

(async () => {
  // Initialize Redis client after vault secrets are loaded
  redisClient = redis.createClient({
    url: `rediss://${process.env.REDISCACHEHOSTNAME}:6380`,
    password: process.env.REDISCACHEKEY,
  });

  redisClient.on('error', (err) => {
  });
  await redisClient.connect();
})();

module.exports = { redisClient };
