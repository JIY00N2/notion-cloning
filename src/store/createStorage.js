export default function createStorage(storage) {
  const setItem = (key, value) => {
    storage.setItem(key, JSON.stringify(value));
  };

  const getItem = (key, defaultValue) => {
    try {
      const storedValue = storage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (e) {
      console.log(e);
      return defaultValue;
    }
  };

  const removeItem = (key) => {
    storage.removeItem(key);
  };

  return { setItem, getItem, removeItem };
}

// const storage = window.localStorage;

// export const getItem = (key, defaultValue) => {
//   try {
//     const storedValue = storage.getItem(key);
//     return storedValue ? JSON.parse(storedValue) : defaultValue;
//   } catch (e) {
//     return defaultValue;
//   }
// };

// export const setItem = (key, value) => {
//   storage.setItem(key, JSON.stringify(value));
// };

// export const removeItem = (key) => {
//   storage.removeItem(key);
// };
