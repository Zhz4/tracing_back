import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMonitorData } from "../context/monitor-data-context";
import { MonitorData } from "@/api/monitor/type";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { setOpen, setCurrentRow } = useMonitorData();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
          aria-label="打开操作菜单"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">更多操作</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px]"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(row.original as MonitorData);
            setOpen(true);
          }}
        >
          查看操作事件
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
