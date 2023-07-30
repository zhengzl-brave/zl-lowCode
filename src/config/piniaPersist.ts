import { PersistedStateOptions } from 'pinia-plugin-persistedstate';

/**
 * @description pinia持久化参数配置
 * @param key 存储到持久化的name
 * @param paths 需要持久化的state name
 * @returns persist
 */
const piniaPersistConfig = (key: string, paths?: string[]) => {
  const persist: PersistedStateOptions = {
    key,
    storage: localStorage, // or sessionStorage
    paths
  };
  return persist;
};

export default piniaPersistConfig;
