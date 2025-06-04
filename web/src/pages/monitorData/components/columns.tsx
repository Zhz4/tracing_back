import { MonitorData } from "@/api/monitor/type";
import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { getEventName } from "@/utils/checkEventAll";
import { EventNames } from "@/constants";
import { VariantProps } from "class-variance-authority";

type EventNameValues = (typeof EventNames)[keyof typeof EventNames];
type BadgeVariants = VariantProps<typeof badgeVariants>["variant"];
const eventNameVariants: Record<EventNameValues, BadgeVariants> = {
  代码错误: "destructive",
  点击事件: "info",
  页面跳转: "accent",
  页面停留: "muted",
  资源首次加载: "success",
  请求事件: "warning",
  请求失败: "destructive",
  资源加载: "outline-info",
};

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
      const { sendTime } = row.original;
      const formattedSendTime = sendTime
        ? dayjs(Number(sendTime)).format("YYYY-MM-DD HH:mm:ss")
        : "-";
      return <div className="text-xs">{formattedSendTime}</div>;
    },
  },
  {
    accessorKey: "appName",
    header: "应用名称",
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
    accessorKey: "eventTypeList",
    header: "事件类型",
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-2">
          {row.original.eventTypeList.map((item, index) => {
            const eventName = getEventName(item.eventType, item.eventId);
            const variant = eventNameVariants[eventName];
            return (
              <Badge key={`${item}-${index}`} variant={variant}>
                {eventName}
              </Badge>
            );
          })}
        </div>
      );
    },
  },
  {
    id: "action",
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
