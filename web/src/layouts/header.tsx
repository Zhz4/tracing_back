import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NavigationProgress } from "@/components/navigatio-progress";
import Tabs from "./tabs";

const Header = () => {
  return (
    <>
      <NavigationProgress />
      <div className="flex items-center justify-between h-16 px-4 w-full border-b">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
      <Tabs />
    </>
  );
};

export default Header;
