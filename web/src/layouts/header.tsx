import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { NavigationProgress } from "@/components/navigatio-progress";
import { cn } from "@/lib/utils";
import Tabs from "./tabs";
import { useMemo } from "react";
import UserSearch from "@/components/UserSearch";

// 头部高度常量
export const HEADER_HEIGHT = "120px";
export const HEADER_HEIGHT_MOBILE = "60px";

const Header = () => {
  const { state, isMobile } = useSidebar();

  const leftPositionClass = useMemo(() => {
    if (isMobile || state === "collapsed") {
      return "left-0";
    }
    return "left-[var(--sidebar-width)]";
  }, [isMobile, state]);

  return (
    <>
      <NavigationProgress />
      <div
        className={cn(
          "fixed top-0 right-0 z-50 bg-background transition-[left] duration-200 ease-linear",
          leftPositionClass
        )}
        style={{
          height: isMobile ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT,
        }}
      >
        <header className="flex items-center justify-between h-16 px-4 w-full border-b">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <UserSearch />
            <ModeToggle />
          </div>
        </header>
        {!isMobile && <Tabs />}
      </div>
    </>
  );
};

export default Header;
