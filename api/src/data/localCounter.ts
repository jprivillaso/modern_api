const counter = new Map<string, number>();

export const incrementLocalCounter = (key: string, value: number): void => {
  if (counter.has(key)) {
    counter.set(key, <number> counter.get(key) + value);
  } else {
    counter.set(key, value);
  }
};

export const getLocalCounter = (key: string): number | undefined => {
  if (counter.has(key)) {
    return counter.get(key);
  }
  return undefined;
};
