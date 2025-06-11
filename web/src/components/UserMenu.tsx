import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronUp, LogOut, User2 } from "lucide-react";
import { getUserInfo, removeUserInfo } from "@/utils/storage/userInfo";
import { removeUserToken } from "@/utils/storage/userToken";
import { UserInfo } from "@/api/login/type";

export function UserMenu() {
  const userInfo: UserInfo = getUserInfo();

  const handleLogout = () => {
    removeUserToken();
    removeUserInfo();
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <User2 /> {userInfo?.username}
          <ChevronUp className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[--radix-popper-anchor-width]"
      >
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          <span>退出登录</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
