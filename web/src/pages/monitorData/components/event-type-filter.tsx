import { EventNames } from "@/constants";
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
import { ChevronDown, Filter } from "lucide-react";

interface EventTypeFilterProps {
  selectedEventTypes: string[];
  onEventTypeChange: (eventTypes: string[]) => void;
}

const EventTypeFilter = ({
  selectedEventTypes,
  onEventTypeChange,
}: EventTypeFilterProps) => {
  const eventTypeOptions = Object.entries(EventNames).map(([key, label]) => ({
    value: key,
    label: label,
  }));

  const handleEventTypeToggle = (eventType: string) => {
    const newSelectedTypes = selectedEventTypes.includes(eventType)
      ? selectedEventTypes.filter((type) => type !== eventType)
      : [...selectedEventTypes, eventType];
    onEventTypeChange(newSelectedTypes);
  };

  const handleSelectAll = () => {
    onEventTypeChange(eventTypeOptions.map((option) => option.value));
  };

  const handleClearAll = () => {
    onEventTypeChange([]);
  };

  return (
    <DropdownMenu>
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
      <DropdownMenuContent className="w-56" align="end">
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
        <DropdownMenuSeparator />
        {eventTypeOptions.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selectedEventTypes.includes(option.value)}
            onCheckedChange={() => handleEventTypeToggle(option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EventTypeFilter;
