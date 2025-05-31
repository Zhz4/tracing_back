import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Header = () => {
  return (
    <div className="flex items-center justify-between h-16 px-4 w-full border-b">
      <SidebarTrigger />
      <ModeToggle />
    </div>
  );
};

export default Header;
