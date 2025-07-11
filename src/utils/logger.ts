/**
 * Production-safe logger that can be disabled
 */

const isDevelopment = process.env.NODE_ENV === "development";

/**
 * Create a logger with a specific prefix
 */
export const createLogger = (prefix: string) => ({
  log: (...args: unknown[]) => logger.log(`[${prefix}]`, ...args),
  warn: (...args: unknown[]) => logger.warn(`[${prefix}]`, ...args),
  error: (...args: unknown[]) => logger.error(`[${prefix}]`, ...args),
  debug: (...args: unknown[]) => logger.debug(`[${prefix}]`, ...args),
  info: (...args: unknown[]) => logger.log(`[${prefix}]`, ...args),
});

export const logger = {
  log: (...args: unknown[]) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },

  info: (...args: unknown[]) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },

  warn: (...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },

  error: (...args: unknown[]) => {
    // Always log errors, but in production you might want to send to monitoring service
    console.error(...args);
  },

  debug: (...args: unknown[]) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  },
};
