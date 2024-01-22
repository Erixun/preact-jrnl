import { openDB } from 'idb';
const DB_NAME = 'journal-db';
const DB_VERSION = 1;
const DB_STORE_NAME = 'journal-store';

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore(DB_STORE_NAME);
  },
});

class IDBDriver {
  constructor() {
    this.init();
  }

  async init() {
    await dbPromise;
  }

  async get(key: IDBKey) {
    return (await dbPromise).get(DB_STORE_NAME, key);
  }

  async set(key: IDBKey, val: any) {
    return (await dbPromise).put(DB_STORE_NAME, val, key);
  }

  async del(key: IDBKey) {
    return (await dbPromise).delete(DB_STORE_NAME, key);
  }

  async clear() {
    return (await dbPromise).clear(DB_STORE_NAME);
  }

  async keys() {
    return (await dbPromise).getAllKeys(DB_STORE_NAME);
  }
}

export default new IDBDriver();

export type IDBKey = IDBKeyRange | IDBValidKey;
