import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Clock, MousePointer, Eye, Edit, Search } from "lucide-react";

export interface BehaviorData {
  id: string;
  timestamp: string;
  action: string;
  target: string;
  duration: string;
  device: string;
}

const getActionIcon = (action: string) => {
  switch (action) {
    case '页面访问':
      return <Eye className="h-4 w-4" />;
    case '按钮点击':
      return <MousePointer className="h-4 w-4" />;
    case '表单提交':
      return <Edit className="h-4 w-4" />;
    case '搜索操作':
      return <Search className="h-4 w-4" />;
    default:
      return <MousePointer className="h-4 w-4" />;
  }
};

const getActionColor = (action: string): "default" | "secondary" | "outline" | "destructive" => {
  switch (action) {
    case '页面访问':
      return 'default';
    case '按钮点击':
      return 'secondary';
    case '表单提交':
      return 'outline';
    case '搜索操作':
      return 'destructive';
    default:
      return 'default';
  }
};

export const columns: ColumnDef<BehaviorData>[] = [
  {
    accessorKey: "timestamp",
    header: "时间",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="font-mono text-sm">{row.getValue("timestamp")}</span>
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "操作类型",
    cell: ({ row }) => {
      const action = row.getValue("action") as string;
      return (
        <Badge variant={getActionColor(action)} className="flex items-center gap-1 w-fit">
          {getActionIcon(action)}
          {action}
        </Badge>
      );
    },
  },
  {
    accessorKey: "target",
    header: "目标对象",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("target")}</span>
    ),
  },
  {
    accessorKey: "duration",
    header: "持续时间",
    cell: ({ row }) => {
      const duration = row.getValue("duration") as string;
      return (
        <span className={duration === '-' ? 'text-muted-foreground' : 'font-mono'}>
          {duration}
        </span>
      );
    },
  },
  {
    accessorKey: "device",
    header: "设备",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("device")}</Badge>
    ),
  },
]; 