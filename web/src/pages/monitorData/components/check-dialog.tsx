import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useMonitorData } from "../context/monitor-data-context";

const CheckDialog = () => {
  const { open, setOpen, currentRow } = useMonitorData();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>查看操作事件</DialogTitle>
        </DialogHeader>
        <div>{JSON.stringify(currentRow?.eventInfo)}</div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckDialog;
