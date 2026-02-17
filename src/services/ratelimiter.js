import redisClient from "../config/redis/index.js";

export const rateLimiter = (limit, windowSeconds) => {
  return async (req, res, next) => {
    try {
      const ip = req.ip;

      const key = `rate_limit:${ip}`;

      // Increment counter
      const current = await redisClient.incr(key);

      // Set expiration if first request
      if (current === 1) {
        await redisClient.expire(key, windowSeconds);
      }

      if (current > limit) {
        const ttl = await redisClient.ttl(key);

        return res.status(429).json({
          message: "Too many requests",
          retryAfter: ttl
        });
      }

      next();

    } catch (err) {
      console.error(err);
      next();
    }
  };
};