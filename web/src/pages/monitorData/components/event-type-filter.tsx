import { EventNames, EventStatusEnum } from "@/constants";
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
import { cn } from "@/lib/utils";

interface EventTypeFilterProps {
  selectedEventTypes: string[];
  onEventTypeChange: (eventTypes: string[]) => void;
}

const EventTypeFilter = ({
  selectedEventTypes,
  onEventTypeChange,
}: EventTypeFilterProps) => {
  // 添加本地状态来管理临时选择的事件类型
  const [tempSelectedTypes, setTempSelectedTypes] =
    useState<string[]>(selectedEventTypes);
  const [isOpen, setIsOpen] = useState(false);

  const eventTypeOptions = Object.entries(EventNames).map(([key, label]) => {
    const result = {
      value: key,
      label: label,
      color: "text-primary",
    };
    if (
      label === EventStatusEnum.请求失败 ||
      label === EventStatusEnum.代码错误 ||
      label === EventStatusEnum.控制台错误
    ) {
      result.color = "text-destructive data-[highlighted]:text-destructive";
    }
    return result;
  });

  // 处理临时选择的事件类型切换
  const handleTempEventTypeToggle = (eventType: string) => {
    const newTempSelectedTypes = tempSelectedTypes.includes(eventType)
      ? tempSelectedTypes.filter((type) => type !== eventType)
      : [...tempSelectedTypes, eventType];
    setTempSelectedTypes(newTempSelectedTypes);
  };

  // 处理全选
  const handleSelectAll = () => {
    setTempSelectedTypes(eventTypeOptions.map((option) => option.value));
  };

  // 处理清空
  const handleClearAll = () => {
    setTempSelectedTypes([]);
  };

  // 一键选择错误类型
  const handleSelectAllError = () => {
    
    setTempSelectedTypes(
      eventTypeOptions
        .filter((option) =>
          [
            EventStatusEnum.代码错误,
            EventStatusEnum.控制台错误,
            EventStatusEnum.请求失败,
          ].includes(option.label)
        )
        .map((option) => option.value)
    );
  };

  // 确定按钮：应用筛选并关闭下拉菜单
  const handleConfirm = () => {
    onEventTypeChange(tempSelectedTypes);
    setIsOpen(false);
  };

  // 取消按钮：恢复到原始状态并关闭下拉菜单
  const handleCancel = () => {
    setTempSelectedTypes(selectedEventTypes);
    setIsOpen(false);
  };

  // 当下拉菜单打开时，同步临时状态
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setTempSelectedTypes(selectedEventTypes);
    }
  };

  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          事件类型筛选
          {selectedEventTypes.length > 0 && (
            <Badge variant="secondary" className="ml-1">
              {selectedEventTypes.length}
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
        <DropdownMenuLabel>选择事件类型</DropdownMenuLabel>
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
        <div className="flex gap-2 p-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={handleSelectAllError}
          >
            一键选择错误类型
          </Button>
        </div>
        <DropdownMenuSeparator />
        {eventTypeOptions.map((option) => (
          <DropdownMenuCheckboxItem
            className={cn(option.color)}
            key={option.value}
            checked={tempSelectedTypes.includes(option.value)}
            onCheckedChange={() => handleTempEventTypeToggle(option.value)}
            onSelect={(e) => e.preventDefault()} // 阻止选择时关闭下拉菜单
          >
            {option.label}
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

export default EventTypeFilter;
