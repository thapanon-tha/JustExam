const redis = require('redis');

let redisClient = null;

(async () => {
  // Initialize Redis client after vault secrets are loaded
  redisClient = redis.createClient({ url: `redis://${process.env.redisHost}:${process.env.redisPort}` });
  redisClient.on('error', (err) => {
    console.log(err);
  });
  await redisClient.connect();
})();

module.exports = { redisClient };
