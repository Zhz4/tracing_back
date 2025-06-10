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
import { AppNameCell } from "./app-name-cell";
import { VendorCell } from "./vendor-cell";
import { PlatformCell } from "./platform-cell";
import { EventTypeCell } from "./event-type-cell";
import { IpCell } from "./ip-cell";

const HEADER_CLASS_NAME =
  "flex items-center gap-2 font-semibold text-foreground";

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
    header: () => (
      <div className={HEADER_CLASS_NAME}>
        <User className="w-4 h-4" />
        用户ID
      </div>
    ),
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
    header: () => (
      <div className={HEADER_CLASS_NAME}>
        <UserCheck className="w-4 h-4" />
        用户名
      </div>
    ),
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
    header: () => (
      <div className={HEADER_CLASS_NAME}>
        <Clock className="w-4 h-4" />
        发送时间
      </div>
    ),
    cell: ({ row }) => {
      const { sendTime } = row.original;
      return <SendTimeCell sendTime={sendTime} />;
    },
  },
  {
    accessorKey: "appName",
    header: () => (
      <div className={HEADER_CLASS_NAME}>
        <Activity className="w-4 h-4" />
        应用名称
      </div>
    ),
    cell: ({ row }) => {
      const appName = row.getValue("appName") as string;
      return <AppNameCell appName={appName} />;
    },
  },
  {
    accessorKey: "vendor",
    header: () => (
      <div className={HEADER_CLASS_NAME}>
        <Globe className="w-4 h-4" />
        浏览器厂商
      </div>
    ),
    cell: ({ row }) => {
      const { vendor } = row.original;
      return <VendorCell vendor={vendor} />;
    },
  },
  {
    accessorKey: "platform",
    header: () => (
      <div className={HEADER_CLASS_NAME}>
        <Monitor className="w-4 h-4" />
        运行平台
      </div>
    ),
    cell: ({ row }) => {
      const platform = row.getValue("platform") as string;
      return <PlatformCell platform={platform} />;
    },
  },
  {
    accessorKey: "ip",
    header: () => (
      <div className={HEADER_CLASS_NAME}>
        <MapPin className="w-4 h-4" />
        IP地址
      </div>
    ),
    cell: ({ row }) => {
      const ip = row.getValue("ip") as string;
      return <IpCell ip={ip} />;
    },
  },
  {
    accessorKey: "eventTypeList",
    header: () => {
      return (
        <div className={HEADER_CLASS_NAME}>
          <Activity className="w-4 h-4" />
          事件类型
        </div>
      );
    },
    cell: ({ row }) => {
      const eventTypeList = row.original.eventTypeList;
      return <EventTypeCell eventTypeList={eventTypeList} />;
    },
    size: 200,
  },
  {
    id: "action",
    header: () => (
      <div className={HEADER_CLASS_NAME}>
        <Activity className="w-4 h-4" />
        操作
      </div>
    ),
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
