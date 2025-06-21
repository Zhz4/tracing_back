import { MonitorData } from "@/api/monitor/type";
import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTableRowActions } from "./data-table-row-actions";
import {
  Monitor,
  MapPin,
  Clock,
  User,
  UserCheck,
  Activity,
  Globe,
} from "lucide-react";
import { SendTimeCell } from "./send-time-cell";
import { VendorCell } from "./vendor-cell";
import { PlatformCell } from "./platform-cell";
import { EventTypeCell } from "./event-type-cell";

const HEADER_CLASS_NAME =
  "flex items-center gap-2 font-semibold text-foreground";

const tableHeader = (tableName: string, icon: React.ReactNode) => {
  return (
    <div className={HEADER_CLASS_NAME}>
      {icon}
      {tableName}
    </div>
  );
};

export const columns: ColumnDef<MonitorData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px] border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px] border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 50,
  },
  {
    accessorKey: "userUuid",
    header: () => tableHeader("用户ID", <User className="w-4 h-4" />),
    cell: ({ row }) => {
      const userUuid = row.getValue("userUuid") as string;
      return (
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-muted-foreground truncate ">
            {userUuid || "-"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "userName",
    header: () => tableHeader("用户名", <UserCheck className="w-4 h-4" />),
    cell: ({ row }) => {
      const userName = row.getValue("userName") as string;
      return (
        <div className="font-medium text-foreground">
          {userName || (
            <span className="text-muted-foreground italic">未知用户</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "sendTime",
    header: () => tableHeader("发送时间", <Clock className="w-4 h-4" />),
    cell: ({ row }) => {
      const { sendTime } = row.original;
      return <SendTimeCell sendTime={sendTime} />;
    },
  },
  {
    accessorKey: "appName",
    header: () => tableHeader("应用名称", <Activity className="w-4 h-4" />),
    cell: ({ row }) => {
      const appName = row.getValue("appName") as string;
      return (
        <div className="px-3 py-1 rounded-full text-sm font-medium  ">
          {appName || "未知应用"}
        </div>
      );
    },
  },
  {
    accessorKey: "vendor",
    header: () => tableHeader("浏览器厂商", <Globe className="w-4 h-4" />),
    cell: ({ row }) => {
      const { vendor } = row.original;
      return <VendorCell vendor={vendor} />;
    },
  },
  {
    accessorKey: "platform",
    header: () => tableHeader("运行平台", <Monitor className="w-4 h-4" />),
    cell: ({ row }) => {
      const platform = row.getValue("platform") as string;
      return <PlatformCell platform={platform} />;
    },
  },
  {
    accessorKey: "ip",
    header: () => tableHeader("IP地址", <MapPin className="w-4 h-4" />),
    cell: ({ row }) => {
      const ip = row.getValue("ip") as string;
      return (
        <div className="font-mono text-sm bg-muted px-2 py-1 rounded border border-border text-foreground max-w-30 truncate">
          {ip || "未知IP"}
        </div>
      );
    },
  },
  {
    accessorKey: "eventTypeList",
    header: () => tableHeader("事件类型", <Activity className="w-4 h-4" />),
    cell: ({ row }) => {
      const eventTypeList = row.original.eventTypeList;
      return <EventTypeCell eventTypeList={eventTypeList} />;
    },
    size: 200,
  },
  {
    id: "action",
    header: () => tableHeader("操作", <Activity className="w-4 h-4" />),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <DataTableRowActions row={row} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 80,
  },
];
