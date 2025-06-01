import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./header";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col h-screen w-full">
        <Header />
        <main className="flex-1 p-2">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
