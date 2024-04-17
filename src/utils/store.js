import { defineStore } from 'pinia';

export const useSharedStore = defineStore({
  id: 'shared',
  state: () => ({
    sharedData: null,
  }),
  actions: {
    setSharedData(data) {
      this.sharedData = data;
    },
    getSharedData() {
      return this.sharedData;
    },
  },
});
