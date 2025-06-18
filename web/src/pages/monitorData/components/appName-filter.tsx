import { APP_NAME } from "@/constants";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Filter, Check, X } from "lucide-react";
import { useState } from "react";

interface AppNameFilterProps {
  selectedAppNames: string[];
  onAppNameChange: (eventTypes: string[]) => void;
}

const AppNameFilter = ({
  selectedAppNames,
  onAppNameChange,
}: AppNameFilterProps) => {
  const [tempSelectedTypes, setTempSelectedTypes] =
    useState<string[]>(selectedAppNames);
  const [isOpen, setIsOpen] = useState(false);

  const handleTempAppNameToggle = (appName: string) => {
    const newTempSelectedTypes = tempSelectedTypes.includes(appName)
      ? tempSelectedTypes.filter((type) => type !== appName)
      : [...tempSelectedTypes, appName];
    setTempSelectedTypes(newTempSelectedTypes);
  };

  // 处理全选
  const handleSelectAll = () => {
    setTempSelectedTypes(Object.values(APP_NAME));
  };

  // 处理清空
  const handleClearAll = () => {
    setTempSelectedTypes([]);
  };


  // 确定按钮：应用筛选并关闭下拉菜单
  const handleConfirm = () => {
    onAppNameChange(tempSelectedTypes);
    setIsOpen(false);
  };

  // 取消按钮：恢复到原始状态并关闭下拉菜单
  const handleCancel = () => {
    setTempSelectedTypes(selectedAppNames);
    setIsOpen(false);
  };

  // 当下拉菜单打开时，同步临时状态
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setTempSelectedTypes(selectedAppNames);
    }
  };

  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          应用名称筛选
          {selectedAppNames.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {selectedAppNames.length}
            </Badge>
          )}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>选择应用名称</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex gap-2 p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSelectAll}
            className="flex-1"
          >
            全选
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="flex-1"
          >
            清空
          </Button>
        </div>
        <DropdownMenuSeparator />
        {Object.values(APP_NAME).map((appName) => (
          <DropdownMenuCheckboxItem
            key={appName}
            checked={tempSelectedTypes.includes(appName)}
            onCheckedChange={() => handleTempAppNameToggle(appName)}
            onSelect={(e) => e.preventDefault()} // 阻止选择时关闭下拉菜单
          >
            {appName}
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <div className="flex gap-2 p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="flex-1 gap-1"
          >
            <X className="h-3 w-3" />
            取消
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleConfirm}
            className="flex-1 gap-1"
          >
            <Check className="h-3 w-3" />
            确定
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppNameFilter;
