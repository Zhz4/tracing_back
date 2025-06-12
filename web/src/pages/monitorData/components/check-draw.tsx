import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMonitorData } from "../context/monitor-data-context";
import EventClickPage from "./events/Event-click";
import EventRoutePage from "./events/Event-route";
import EventRequestPage from "./events/Event-request";
import { getEventName } from "@/utils/checkEventAll";
import EventErrorPage from "./events/Event-error";
import { EventStatusEnum } from "@/constants";
import {
  EventClick,
  EventError,
  EventRoute,
  EventRequest,
  EventResource,
} from "@/types";
import { MonitorData } from "@/api/monitor/type";
import EventResourcePage from "./events/Event-resource";
import { getEventById } from "@/api/monitor";
import { useQuery } from "@tanstack/react-query";

// 渲染事件组件的函数
const renderEventComponent = (
  item: EventClick | EventError | EventRoute | EventRequest | EventResource,
  currentRow: MonitorData | null
) => {
  const eventName = getEventName(item.eventType, item.eventId);
  // 添加空值检查
  if (!currentRow) return null;
  switch (eventName) {
    case EventStatusEnum.点击事件:
      return <EventClickPage event={item as EventClick} />;

    case EventStatusEnum.代码错误:
    case EventStatusEnum.控制台错误:
      return <EventErrorPage event={item as EventError} id={currentRow.id} />;

    case EventStatusEnum.页面跳转:
    case EventStatusEnum.页面停留:
      return <EventRoutePage event={item as EventRoute} />;

    case EventStatusEnum.请求事件:
    case EventStatusEnum.请求失败:
      return (
        <EventRequestPage event={item as EventRequest} id={currentRow.id} />
      );
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
  });

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="fixed right-0 top-0 w-full !max-w-[700px] h-[98vh] overflow-y-auto overflow-x-hidden  rounded-2xl my-2">
        <DrawerHeader className="sticky w-full top-0 z-10 bg-background">
          <DrawerTitle>查看操作事件</DrawerTitle>
          <DrawerDescription>查看用户操作事件详情</DrawerDescription>
        </DrawerHeader>
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
                {renderEventComponent(item, currentRow)}
              </div>
            ))
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CheckDialog;
