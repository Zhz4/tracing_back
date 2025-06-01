import { Checkbox } from "@/components/ui/checkbox";
import { type ColumnDef } from "@tanstack/react-table";

export type MonitorData = {
  id: string;
  userName: string;
  userId: string;
  userIp: string;
  userAgent: string;
  userReferer: string;
  userUrl: string;
  userTime: string;
  userStatus: string;
  userType: string;
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
];
