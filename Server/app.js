const redis = require('redis');

// let redisClient = null;
async function connect() {
  // Add your cache name and access key.
  const redisClient = redis.createClient({
    url: 'redis://je-casch.redis.cache.windows.net:6380',
    password: 'RWdHLf85B6jK1eRaUTOMyEzKQfBbLdiFoAzCaKECX84=',
    tls: { servername: 'je-casch.redis.cache.windows.net' },
  });
  await redisClient.connect();

  // Perform cache operations using the cache connection object...

  // Simple PING command
  console.log('\nCache command: PING');
  console.log(`Cache response : ${await redisClient.ping()}`);

  // Simple get and put of integral data types into the cache
  console.log('\nCache command: GET Message');
  console.log(`Cache response : ${await redisClient.get('FOR_NEW')}`);

  console.log('\nCache command: SET Message');
  console.log(
    `Cache response : ${await cacheConnection.set('FOR_NEW', 'NEW_NA_HEE')}`,
  );

  // Demonstrate "SET Message" executed as expected...
  console.log('\nCache command: GET Message');
  console.log(`Cache response : ${await cacheConnection.get('FOR_NEW')}`);

  console.log('\nDone');
  process.exit();
}

connect();