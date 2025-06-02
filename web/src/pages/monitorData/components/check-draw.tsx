import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMonitorData } from "../context/monitor-data-context";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const CheckDialog = () => {
  const { open, setOpen, currentRow } = useMonitorData();
  const navigate = useNavigate();

  const handleViewRecordscreen = (rowId: string) => {
    navigate(`/recordscreen?rowId=${rowId}`);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerContent className="w-[500px] rounded-2xl my-2 h-[98vh] overflow-y-auto">
        <DrawerHeader className="sticky top-0 z-10 bg-background">
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
              <div className="flex items-center gap-2">
                错误录屏信息：
                {item.recordscreen && currentRow?.id ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewRecordscreen(currentRow.id)}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    查看录屏回放
                  </Button>
                ) : (
                  <span className="text-gray-500">无录屏数据</span>
                )}
              </div>
              <div>========================================</div>
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CheckDialog;
