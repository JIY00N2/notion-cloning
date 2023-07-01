export default function createStorage(storage) {
  const setStorageItem = (key, value) => {
    storage.setItem(key, JSON.stringify(value));
  };

  const getStorageItem = (key, defaultValue) => {
    try {
      const storedValue = storage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (e) {
      console.log(e);
      return defaultValue;
    }
  };

  const removeStorageItem = (key) => {
    storage.removeItem(key);
  };

  return { setStorageItem, getStorageItem, removeStorageItem };
}
