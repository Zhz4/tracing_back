import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavigationProgress } from "@/components/navigatio-progress";
import Tabs from "./tabs";

// 头部高度
export const HEADER_HEIGHT = "120px";

const Header = () => {
  return (
    <>
      <NavigationProgress />
      <div
        className="fixed top-0 left-[var(--sidebar-width)] right-0 z-50 bg-background"
        style={
          {
            height: "var(--header-height)",
          } as React.CSSProperties
        }
      >
        <header className="flex items-center justify-between h-16 px-4 w-full border-b">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
        </header>
        <Tabs />
      </div>
    </>
  );
};

export default Header;
