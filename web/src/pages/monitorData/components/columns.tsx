import { MonitorData } from "@/api/monitor/type";
import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

export const columns: ColumnDef<MonitorData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userUuid",
    header: "用户ID",
  },
  {
    accessorKey: "userName",
    header: "用户名",
  },
  {
    accessorKey: "sendTime",
    header: "发送时间",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.sendTime
            ? dayjs(row.original.sendTime).format("YYYY-MM-DD HH:mm:ss")
            : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "vendor",
    header: "浏览器厂商",
  },
  {
    accessorKey: "platform",
    header: "浏览器平台的环境",
  },
  {
    accessorKey: "ip",
    header: "IP地址",
  },
  {
    accessorKey: "eventInfo",
    header: "事件信息",
  },
];
