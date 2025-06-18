import { Badge, badgeVariants } from "@/components/ui/badge";
import { getEventName } from "@/utils/checkEventAll";
import { EventNames, EventTypeEnum } from "@/constants";
import { VariantProps } from "class-variance-authority";
import { EventStatusEnum } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type EventNameValues = (typeof EventNames)[keyof typeof EventNames];
type BadgeVariants = VariantProps<typeof badgeVariants>["variant"];
const eventNameVariants: Record<
  EventNameValues,
  { variant: BadgeVariants; icon?: React.ReactNode; priority: number }
> = {
  [EventStatusEnum.代码错误]: {
    variant: "destructive",
    icon: "🐛",
    priority: 1,
  },
  [EventStatusEnum.控制台错误]: {
    variant: "destructive",
    icon: "❌",
    priority: 2,
  },
  [EventStatusEnum.请求失败]: {
    variant: "destructive",
    icon: "🚫",
    priority: 3,
  },
  [EventStatusEnum.主动上报错误录屏]: {
    variant: "destructive",
    icon: "🎥",
    priority: 4,
  },
  [EventStatusEnum.点击事件]: { variant: "secondary", icon: "👆", priority: 4 },
  [EventStatusEnum.页面跳转]: { variant: "default", icon: "🔗", priority: 5 },
  [EventStatusEnum.页面停留]: { variant: "outline", icon: "⏱️", priority: 6 },
  [EventStatusEnum.资源首次加载]: {
    variant: "default",
    icon: "✅",
    priority: 7,
  },
  [EventStatusEnum.请求事件]: { variant: "secondary", icon: "📡", priority: 8 },
  [EventStatusEnum.资源加载]: { variant: "outline", icon: "📦", priority: 9 },
};

// 默认事件配置
const defaultEventConfig = {
  variant: "secondary" as BadgeVariants,
  icon: "❓",
  priority: 999,
};

interface EventTypeItem {
  eventType: string;
  eventId: string;
}

interface EventTypeCellProps {
  eventTypeList: EventTypeItem[];
  maxVisible?: number;
}

export const EventTypeCell = ({
  eventTypeList,
  maxVisible = 3,
}: EventTypeCellProps) => {
  const hasMore = eventTypeList.length > maxVisible;

  // 按优先级排序
  const sortedEventTypeList = [...eventTypeList].sort((a, b) => {
    const eventNameA = getEventName(
      a.eventType as `${EventTypeEnum}`,
      a.eventId
    );
    const eventNameB = getEventName(
      b.eventType as `${EventTypeEnum}`,
      b.eventId
    );
    const configA = eventNameVariants[eventNameA] || defaultEventConfig;
    const configB = eventNameVariants[eventNameB] || defaultEventConfig;
    return configA.priority - configB.priority;
  });

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap gap-1">
        {sortedEventTypeList.slice(0, maxVisible).map((item, index) => {
          const eventName = getEventName(
            item.eventType as `${EventTypeEnum}`,
            item.eventId
          );
          const eventConfig =
            eventNameVariants[eventName] || defaultEventConfig;
          return (
            <Badge
              key={`${item}-${index}`}
              variant={eventConfig.variant}
              className="text-xs px-2 py-1 flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
            >
              {eventConfig.icon && (
                <span className="text-xs">{eventConfig.icon}</span>
              )}
              {eventName}
            </Badge>
          );
        })}
      </div>
      {hasMore && (
        <Tooltip>
          <TooltipTrigger>
            <Badge
              variant="outline"
              className="text-xs cursor-pointer hover:bg-muted"
            >
              +{sortedEventTypeList.length - maxVisible} 更多
            </Badge>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <div className="space-y-1">
              {sortedEventTypeList.slice(maxVisible).map((item, index) => {
                const eventName = getEventName(
                  item.eventType as `${EventTypeEnum}`,
                  item.eventId
                );
                return (
                  <div key={index} className="text-xs">
                    {eventName}
                  </div>
                );
              })}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
