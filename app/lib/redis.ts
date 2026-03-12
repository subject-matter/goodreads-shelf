import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const COUNTER_KEY = "shelves_built";
const SEEN_SET_KEY = "shelves_seen_users";

export async function incrementShelvesBuilt(userId: string): Promise<void> {
  const added = await redis.sadd(SEEN_SET_KEY, userId);
  if (added) {
    await redis.incr(COUNTER_KEY);
  }
}

export async function getShelvesBuilt(): Promise<number> {
  return (await redis.get<number>(COUNTER_KEY)) ?? 0;
}
