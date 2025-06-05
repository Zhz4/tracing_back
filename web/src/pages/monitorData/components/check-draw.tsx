import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMonitorData } from "../context/monitor-data-context";
import EventClickPage from "./event-click";
import EventRoutePage from "./Event-route";
import EventRequestPage from "./Event-request";
import { getEventName } from "@/utils/checkEventAll";
import EventErrorPage from "./Event-error";

const CheckDialog = () => {
  const { open, setOpen, currentRow } = useMonitorData();

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="fixed right-0 top-0 w-full !max-w-[600px] h-[98vh] overflow-y-auto overflow-x-hidden  rounded-2xl my-2">
        <DrawerHeader className="sticky w-full top-0 z-10 bg-background">
          <DrawerTitle>查看操作事件</DrawerTitle>
          <DrawerDescription>查看用户操作事件详情</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 w-full">
          {currentRow?.eventInfo?.map((item, index) => (
            <div key={`${item.eventId}-${index}`}>
              {getEventName(item.eventType, item.eventId) === "点击事件" && (
                <EventClickPage event={item} />
              )}
              {getEventName(item.eventType, item.eventId) === "代码错误" && (
                <EventErrorPage event={item} id={currentRow.id} />
              )}
              {getEventName(item.eventType, item.eventId) === "页面跳转" ||
                (getEventName(item.eventType, item.eventId) === "页面停留" && (
                  <EventRoutePage event={item} />
                ))}
              {(getEventName(item.eventType, item.eventId) === "请求事件" ||
                getEventName(item.eventType, item.eventId) === "请求失败") && (
                <EventRequestPage event={item} id={currentRow.id} />
              )}
              {/* {getEventName(item.eventType, item.eventId) === "资源加载" && (
                <EventRequestPage event={item} id={currentRow.id} />
              )} */}
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CheckDialog;
