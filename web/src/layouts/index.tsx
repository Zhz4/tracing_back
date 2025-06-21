import { SidebarProvider } from "@/components/ui/sidebar";
import Header, { HEADER_HEIGHT } from "./header";
import { AppSidebar } from "@/components/app-sidebar";
import { useLocation, useMatches, useOutlet } from "react-router-dom";
import { KeepAlive, useKeepAliveRef } from "keepalive-for-react";
import { Suspense, useEffect } from "react";
import { MAX_TABS_COUNT } from "@/constants";
import { useDocumentTitle } from "@/hooks/use-document-title";

import { useCounterStore } from "@/stores/tab";
export default function Layout() {
  const aliveRef = useKeepAliveRef();
  const outlet = useOutlet();
  const { addTab, keepAliveInclude } = useCounterStore();
  const { pathname, search } = useLocation();
  const matches = useMatches();
  const currentCacheKey = pathname + search;

  // 获取当前页面标题
  const lastMatch = matches.at(-1);
  const handle = lastMatch?.handle as { title?: string } | undefined;
  const currentTitle = handle?.title || "未知页面";

  // 动态更新文档标题
  useDocumentTitle(currentTitle);

  // 添加tab缓存标签
  useEffect(() => {
    addTab({ path: currentCacheKey, name: currentTitle });
  }, [currentCacheKey, addTab, currentTitle]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <div
        className="flex flex-col w-full"
        style={
          {
            "--header-height": HEADER_HEIGHT,
            height: "calc(100vh - var(--header-height))",
          } as React.CSSProperties
        }
      >
        <Header />
        <KeepAlive
          aliveRef={aliveRef}
          activeCacheKey={currentCacheKey}
          include={keepAliveInclude}
          cacheNodeClassName="w-full h-full"
          max={MAX_TABS_COUNT}
        >
          <main className="flex-1 p-6 mt-[var(--header-height)]">
            <Suspense fallback={null}>{outlet}</Suspense>
          </main>
        </KeepAlive>
      </div>
    </SidebarProvider>
  );
}
