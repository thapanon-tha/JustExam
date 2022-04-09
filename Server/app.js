var redis = require("redis");


async function testCache() {
    // Add your cache name and access key.
    var cacheConnection = redis.createClient(6380, 
        "je-casch.redis.cache.windows.net",
        {
            auth_pass: "RWdHLf85B6jK1eRaUTOMyEzKQfBbLdiFoAzCaKECX84=",
            tls: {servername: "je-casch.redis.cache.windows.net"},
        },
        
        );
    await cacheConnection.connect();

    // Perform cache operations using the cache connection object...

    // Simple PING command
    console.log("\nCache command: PING");
    console.log("Cache response : " + await cacheConnection.ping());

    // Simple get and put of integral data types into the cache
    console.log("\nCache command: GET Message");
    console.log("Cache response : " + await cacheConnection.get("FOR_NEW"));

    console.log("\nDone");
    process.exit();
}

testCache();