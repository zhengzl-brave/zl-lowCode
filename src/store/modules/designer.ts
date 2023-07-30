import { defineStore } from "pinia";
import { getDefaultFormConfig, deepClone } from '@/utils'

let defaultFormConfig = deepClone(getDefaultFormConfig())

export interface DesignStore {
  selectedId: any;
  selectedWidget: any,
  widgetList: any,
  formConfig: any
}
export const useDesignerStore = defineStore({
  id: "designer",
  state: (): DesignStore => ({
    selectedId: null,
    selectedWidget: null,
    widgetList: [],
    formConfig: {
      ...defaultFormConfig
    }
  }),
  getters: {},
  actions: {
    setDesignStore(key: keyof DesignStore, val: any) {
      this.$patch({ [key]: val });
    },
  },
});
