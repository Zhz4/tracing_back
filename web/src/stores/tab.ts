import { create } from "zustand";

interface Tab {
  name: string;
  path: string;
}

interface CounterState {
  tabList: Tab[];
  keepAliveInclude: string[];
  addTab: (tab: Tab) => void;
  removeTab: (tab: Tab) => void;
  setKeepAliveInclude: () => void;
}

// 设置不被tab缓存的路由
const noCacheRoutes = ["/"];
// 设置不被keepalive缓存的路由
const noKeepAliveRoutes = [new RegExp(`^/recordscreen(/[^/?]+)?(\\?.*)?$`)];

export const useCounterStore = create<CounterState>((set, get) => ({
  tabList: [],
  keepAliveInclude: [],
  /**
   * 添加tab 并设置keepalive缓存
   */
  addTab: (tab: Tab) => {
    set((state) => {
      // 如果存在则不添加
      if (
        state.tabList.some((t) => t.path === tab.path) ||
        noCacheRoutes.includes(tab.path)
      ) {
        return { tabList: state.tabList };
      }
      const newTabList = [...new Set([...state.tabList, tab])];
      return { tabList: newTabList };
    });
    get().setKeepAliveInclude();
  },
  /**
   * 删除tab 并设置keepalive缓存
   */
  removeTab: (tab: Tab) => {
    set((state) => {
      const newTabList = state.tabList.filter((t) => t.path !== tab.path);
      return { tabList: newTabList };
    });
    get().setKeepAliveInclude();
  },
  /**
   * 设置keepalive缓存
   */
  setKeepAliveInclude: () => {
    set((state) => {
      const newKeepAliveInclude = state.tabList
        .map((t) => t.path)
        .filter((t) => !noKeepAliveRoutes.some((r) => r.test(t)));
      return { keepAliveInclude: newKeepAliveInclude };
    });
  },
}));
