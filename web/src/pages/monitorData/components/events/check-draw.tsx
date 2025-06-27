import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMonitorData } from "../../context/monitor-data-context";
import EventClickPage from "./Event-click";
import EventRoutePage from "./Event-route";
import EventRequestPage from "./Event-request";
import { getEventName } from "@/utils/checkEventAll";
import EventErrorPage from "./Event-error";
import { EventStatusEnum } from "@/constants";
import {
  EventClick,
  EventError,
  EventRoute,
  EventRequest,
  EventResource,
} from "@/types";
import EventResourcePage from "./Event-resource";
import { getEventById } from "@/api/monitor";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// 渲染事件组件的函数
const renderEventComponent = (
  item: EventClick | EventError | EventRoute | EventRequest | EventResource
) => {
  const eventName = getEventName(item.eventType, item.eventId);
  switch (eventName) {
    case EventStatusEnum.点击事件:
      return <EventClickPage event={item as EventClick} />;

    case EventStatusEnum.代码错误:
    case EventStatusEnum.控制台错误:
    case EventStatusEnum.主动上报错误录屏:
      return <EventErrorPage event={item as EventError} />;

    case EventStatusEnum.页面跳转:
    case EventStatusEnum.页面停留:
      return <EventRoutePage event={item as EventRoute} />;

    case EventStatusEnum.请求事件:
    case EventStatusEnum.请求失败:
      return <EventRequestPage event={item as EventRequest} />;
    case EventStatusEnum.资源加载:
    case EventStatusEnum.资源首次加载:
      return <EventResourcePage event={item as EventResource} />;
    default:
      return null;
  }
};

const CheckDialog = () => {
  const { open, setOpen, currentRow } = useMonitorData();
  const { data, isLoading } = useQuery({
    queryKey: ["event", currentRow?.id],
    queryFn: () => getEventById(currentRow?.id as string),
    enabled: open && !!currentRow?.id,
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full !max-w-[700px] overflow-y-auto overflow-x-hidden"
      >
        <SheetHeader className="sticky w-full top-0 z-10 bg-background">
          <SheetTitle>查看操作事件</SheetTitle>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 hover:bg-transparent"
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
          <SheetDescription>查看用户操作事件详情</SheetDescription>
        </SheetHeader>
        <div className="p-4 w-full">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">
                正在加载事件数据...
              </p>
            </div>
          ) : (
            data?.map((item, index) => (
              <div key={`${item.eventId}-${index}`}>
                {renderEventComponent(item)}
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CheckDialog;
