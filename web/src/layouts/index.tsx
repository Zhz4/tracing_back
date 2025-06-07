import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./header";
import { AppSidebar } from "@/components/app-sidebar";
import { useLocation, useOutlet } from "react-router-dom";
import { KeepAlive, useKeepAliveRef } from "keepalive-for-react";
import { Suspense } from "react";
import { MAX_TABS_COUNT } from "@/constants";

export default function Layout() {
  const aliveRef = useKeepAliveRef();
  const outlet = useOutlet();
  const currentCacheKey = useLocation().pathname + useLocation().search;
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col h-screen w-full">
        <KeepAlive
          aliveRef={aliveRef}
          activeCacheKey={currentCacheKey}
          cacheNodeClassName="w-full h-full"
          max={MAX_TABS_COUNT}
        >
          <Header />
          <main className="flex-1 p-2">
            <Suspense fallback={null}>{outlet}</Suspense>
          </main>
        </KeepAlive>
      </div>
    </SidebarProvider>
  );
}
