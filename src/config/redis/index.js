import { createClient } from 'redis';

import Queue from 'bull';

const redisClient = createClient({ url: 'redis://localhost:6379'})
redisClient.on('error', (err) => console.error('Redis Error', err));

await redisClient.connect();
//Bull
export const emailQueue = new Queue('email-queue', {
    redis: {host:'127.0.01', port:6379}
});
export default redisClient;
