import { create } from 'zustand'

interface Tab {
  name: string
  path: string
}

interface CounterState {
  tabList: Tab[]
  addTab: (tab: Tab) => void
  removeTab: (tab: Tab) => void
}

// 设置不缓存的路由
const noCacheRoutes = ['/'];

export const useCounterStore = create<CounterState>((set) => ({
  tabList: [],
  addTab: (tab: Tab) => set((state) => {
    // 如果存在则不添加
    if (state.tabList.some((t) => t.path === tab.path) || noCacheRoutes.includes(tab.path)) {
      return { tabList: state.tabList };
    }
    const newTabList = [...new Set([...state.tabList, tab])];
    return { tabList: newTabList };
  }),
  removeTab: (tab: Tab) => set((state) => {
    const newTabList = state.tabList.filter((t) => t.path !== tab.path);
    return { tabList: newTabList };
  }),
}))
