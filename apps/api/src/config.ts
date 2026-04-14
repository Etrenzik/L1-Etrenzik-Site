import "dotenv/config";

export const config = {
  port: parseInt(process.env.API_PORT ?? "4000", 10),
  host: process.env.API_HOST ?? "0.0.0.0",
  corsOrigin: process.env.API_CORS_ORIGIN ?? "http://localhost:3000",
  maxFileSizeMb: parseInt(process.env.MAX_FILE_SIZE_MB ?? "100", 10),
  logLevel: process.env.LOG_LEVEL ?? "info",
  redisUrl: process.env.REDIS_URL ?? "redis://localhost:6379",
  uploadDir: process.env.UPLOAD_DIR ?? "./uploads",
  auditLogEnabled: process.env.AUDIT_LOG_ENABLED === "true",
} as const;
