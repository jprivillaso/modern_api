import { getLogger } from "./logger";

export const postgresDataSync = (key: string, value: number): void => {
  // Push message to queue
  getLogger().info(`Pushing message to queue:: key = ${key} - value: ${value}`);
};
