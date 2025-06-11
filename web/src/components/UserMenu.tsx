import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, ChevronDown } from "lucide-react";
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
        <Button
          variant="ghost"
          className="flex items-center space-x-2 cursor-pointer border-none"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={userInfo?.avatar} alt={userInfo?.username} />
            <AvatarFallback>{userInfo?.username}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{userInfo?.username}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>退出登录</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
