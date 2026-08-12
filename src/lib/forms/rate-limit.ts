const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

type RateStore = Map<string, number[]>;

const globalForRateLimit = globalThis as typeof globalThis & {
  __rayanStudioLeadRateStore?: RateStore;
};

const requestLog = globalForRateLimit.__rayanStudioLeadRateStore ?? new Map<string, number[]>();
if (process.env.NODE_ENV !== "production") globalForRateLimit.__rayanStudioLeadRateStore = requestLog;

// ponytail: per-instance in-memory limiter; a durable cross-instance store is a separate decision.
export function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (requestLog.get(key) ?? []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

export function resetRateLimitForTests() {
  requestLog.clear();
}
