import { stores as mockStores } from "@/data/mockDatabase";

let storesDB = [...mockStores];

const storesApi = {

  /** GET /stores */
  getMyStores: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(storesDB);
      }, 300);
    });
  },

  /** GET /stores/:id */
  getStoreById: async (storeId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const store = storesDB.find((s) => s.id === storeId);
        if (!store) return reject("Store not found");
        resolve(store);
      }, 200);
    });
  },

  /** POST /stores */
  createStore: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStore = {
          id: `store_${Date.now()}`,
          ...data,
          createdAt: new Date().toISOString()
        };

        storesDB.push(newStore);
        resolve(newStore);
      }, 300);
    });
  },

  /** PUT /stores/:id */
  updateStore: async (storeId, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = storesDB.findIndex((s) => s.id === storeId);
        if (index === -1) return reject("Store not found");

        storesDB[index] = {
          ...storesDB[index],
          ...data
        };

        resolve(storesDB[index]);
      }, 300);
    });
  },

  /** DELETE /stores/:id */
  deleteStore: async (storeId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        storesDB = storesDB.filter((s) => s.id !== storeId);
        resolve({ success: true });
      }, 200);
    });
  },

  /** Slug check (mock) */
  checkSlugAvailability: async (slug) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const exists = storesDB.some((s) => s.slug === slug);
        resolve({ available: !exists });
      }, 150);
    });
  }
};

export default storesApi;