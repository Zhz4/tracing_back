import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, Crown, Shield } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { usePlatform } from "@/hooks/use-platform";

const UserSearch = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const navigate = useNavigate();
  const platform = usePlatform();

  // 键盘快捷键监听
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleUserAction = (action: string, userId?: string) => {
    console.log("用户操作:", action, userId ? `用户ID: ${userId}` : "");

    if (action === "view-user" && userId) {
      // 跳转到用户行为分析页面
      navigate(`/user-behavior/${userId}`);
    }

    setCommandOpen(false);
  };

  // 模拟用户数据
  const mockUsers = [
    { id: "1", name: "张三", email: "zhangsan@example.com", role: "admin" },
    { id: "2", name: "李四", email: "lisi@example.com", role: "user" },
    { id: "3", name: "王五", email: "wangwu@example.com", role: "editor" },
    { id: "4", name: "赵六", email: "zhaoliu@example.com", role: "user" },
  ];

  return (
    <>
      {/* 搜索按钮 */}
      <Button
        variant="outline"
        className="relative h-9 w-full max-w-sm justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setCommandOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">搜索用户...</span>
        <span className="inline-flex lg:hidden">搜索用户</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">{platform === "mac" ? "⌘" : "Ctrl"}</span> +
          <span className="text-xs">K</span>
        </kbd>
      </Button>

      {/* 用户搜索对话框 */}
      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="输入用户名进行搜索..." />
        <CommandList>
          <CommandEmpty>没有找到匹配的用户</CommandEmpty>

          <CommandGroup heading="用户列表">
            {mockUsers.map((user) => (
              <CommandItem
                key={user.id}
                onSelect={() => handleUserAction("view-user", user.id)}
              >
                <User className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
                <div className="ml-auto flex items-center">
                  {user.role === "admin" && (
                    <Crown className="h-3 w-3 text-yellow-500" />
                  )}
                  {user.role === "editor" && (
                    <Shield className="h-3 w-3 text-blue-500" />
                  )}
                  {user.role === "user" && (
                    <User className="h-3 w-3 text-gray-500" />
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default UserSearch;
