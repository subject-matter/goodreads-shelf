import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const COUNTER_KEY = "shelves_built";

export async function incrementShelvesBuilt(): Promise<number> {
  return redis.incr(COUNTER_KEY);
}

export async function getShelvesBuilt(): Promise<number> {
  return (await redis.get<number>(COUNTER_KEY)) ?? 0;
}
