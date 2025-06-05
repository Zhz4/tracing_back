import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMonitorData } from "../context/monitor-data-context";
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
import { MonitorData } from "@/api/monitor/type";
import EventResourcePage from "./Event-resource";

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
      return <EventResourcePage event={item as EventResource} />;
    default:
      return null;
  }
};

const CheckDialog = () => {
  const { open, setOpen, currentRow } = useMonitorData();

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="fixed right-0 top-0 w-full !max-w-[700px] h-[98vh] overflow-y-auto overflow-x-hidden  rounded-2xl my-2">
        <DrawerHeader className="sticky w-full top-0 z-10 bg-background">
          <DrawerTitle>查看操作事件</DrawerTitle>
          <DrawerDescription>查看用户操作事件详情</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 w-full">
          {currentRow?.eventInfo?.map((item, index) => (
            <div key={`${item.eventId}-${index}`}>
              {renderEventComponent(item, currentRow)}
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CheckDialog;
