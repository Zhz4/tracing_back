import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Loader2, Search, User } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { usePlatform } from "@/hooks/use-platform";
import { getTrackingUser } from "@/api/trackingUser";
import { useDebounce } from "use-debounce";

const UserSearch = () => {
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // 防抖 500ms
  const { data: users, isLoading } = useQuery({
    queryKey: ["searchUsers", debouncedSearchQuery],
    queryFn: () => getTrackingUser({ userName: debouncedSearchQuery }),
    refetchOnWindowFocus: false,
    staleTime: 24 * 60 * 60 * 1000, // 24小时不重新获取
  });

  const handleUserAction = (action: string, userUuid?: string) => {
    if (action === "view-user" && userUuid) {
      navigate(`/user-behavior/${userUuid}`);
    }
    setCommandOpen(false);
  };
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
        <CommandInput
          placeholder="输入用户名进行搜索..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandGroup heading="搜索结果">
            {isLoading ? (
              <CommandEmpty className="flex items-center justify-center py-6">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                加载中...
              </CommandEmpty>
            ) : (
              <CommandEmpty className="flex items-center justify-center py-6">
                <Search className="mr-2 h-4 w-4" />
                没有找到匹配的用户
              </CommandEmpty>
            )}
            {users &&
              users.map((user) => (
                <CommandItem
                  key={user.userUuid}
                  onSelect={() => handleUserAction("view-user", user.userUuid)}
                >
                  <User className="mr-2 h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">{user.userName}</span>
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
