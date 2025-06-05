import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./header";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { KeepAlive, useKeepAliveRef } from "keepalive-for-react";
import { Suspense } from "react";

export default function Layout() {
  const aliveRef = useKeepAliveRef();
  const currentCacheKey = useLocation().pathname;
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col h-screen w-full">
        <KeepAlive
          transition
          aliveRef={aliveRef}
          activeCacheKey={currentCacheKey}
          cacheNodeClassName="w-full h-full"
          max={18}
        >
          <Header />
          <main className="flex-1 p-2">
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </main>
        </KeepAlive>
      </div>
    </SidebarProvider>
  );
}
