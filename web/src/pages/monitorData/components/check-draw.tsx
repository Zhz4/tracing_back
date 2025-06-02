import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMonitorData } from "../context/monitor-data-context";

const CheckDialog = () => {
  const { open, setOpen, currentRow } = useMonitorData();
  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="w-[500px] rounded-2xl my-2 h-[98vh] overflow-y-auto">
        <DrawerHeader className="sticky top-0 z-10 bg-white">
          <DrawerTitle>查看操作事件</DrawerTitle>
          <DrawerDescription>查看用户操作事件详情</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          {currentRow?.eventInfo?.map((item) => (
            <div key={item.eventId}>
              <div>事件类型: {item.eventType}</div>
              <div>事件发生时间: {item.triggerTime}</div>
              <div>发送时间: {item.sendTime}</div>
              <div>当前页面URL: {item.triggerPageUrl}</div>
              <div>页面标题：{item.title}</div>
              <div>错误录屏信息：{JSON.stringify(item.recordscreen)}</div>
              <div>========================================</div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CheckDialog;
