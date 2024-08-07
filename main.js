import redisClient from './utils/redis';

(async () => {
    console.log(redisClient.isAlive()); // Check if the connection is alive
    console.log(await redisClient.get('myKey')); // Retrieve value
    await redisClient.set('myKey', 12, 5); // Set value with expiration
    console.log(await redisClient.get('myKey')); // Retrieve value immediately after setting

    setTimeout(async () => {
        console.log(await redisClient.get('myKey')); // Retrieve value after expiration
    }, 1000 * 10); // Check after 10 seconds
})();

