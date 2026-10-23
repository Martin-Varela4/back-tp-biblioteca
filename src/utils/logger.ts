type LogLevel = "INFO" | "WARN" | "ERROR" | "HTTP";

const getTimestamp = (): string => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const logger = {
  http(message: string): void {
    console.log(`[HTTP] ${message}`);
  },

  info(message: string, context?: unknown): void {
    const time = getTimestamp();
    if (context !== undefined) {
      console.log(`[${time}] [INFO] ${message}`, context);
    } else {
      console.log(`[${time}] [INFO] ${message}`);
    }
  },

  warn(message: string, context?: unknown): void {
    const time = getTimestamp();
    if (context !== undefined) {
      console.warn(`[${time}] [WARN] ${message}`, context);
    } else {
      console.warn(`[${time}] [WARN] ${message}`);
    }
  },

  error(message: string, error?: unknown): void {
    const time = getTimestamp();
    if (error !== undefined) {
      console.error(`[${time}] [ERROR] ${message}`, error);
    } else {
      console.error(`[${time}] [ERROR] ${message}`);
    }
  },
};
