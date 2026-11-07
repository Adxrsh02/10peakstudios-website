export interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta: Record<string, unknown>;
  error?: string;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1Result>;
}

export interface Fetcher {
  fetch(request: Request | string, init?: RequestInit): Promise<Response>;
}

export interface WorkerEnv {
  ASSETS?: Fetcher;
  LEADS_DB?: D1Database;
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  IP_HASH_SALT?: string;
  LEAD_NOTIFY_TO?: string;
  LEAD_FROM?: string;
  ALLOWED_ORIGINS?: string;
  TURNSTILE_EXPECTED_HOSTNAME?: string;
  AUTO_REPLY_ENABLED?: string;
}
