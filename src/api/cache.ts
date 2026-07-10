const cache = new Map<string, unknown>();

export const getCache = <T>(key: string): T | undefined => {
    return cache.get(key) as T;
};

export const setCache = <T>(key: string, value: T) => {
    cache.set(key, value);
};
