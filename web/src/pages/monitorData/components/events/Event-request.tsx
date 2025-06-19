import { Button } from "@/components/ui/button";
import { EventRequest } from "@/types";
import dayjs from "dayjs";
import {
  ExternalLink,
  Globe,
  Clock,
  Activity,
  Timer,
  AlertCircle,
  Video,
  CheckCircle,
  XCircle,
  Copy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import EventCardHeard from "./event-card-heard";
import { useMonitorData } from "../../context/monitor-data-context";
import CopyText from "@/utils/util";

interface EventRequestProps {
  event: EventRequest;
  isScreen?: boolean;
}

const EventRequestPage = ({ event, isScreen = false }: EventRequestProps) => {
  const { setOpen } = useMonitorData();

  const navigate = useNavigate();

  const handleViewRecordscreen = (rowId: string) => {
    navigate(`/recordscreen?rowId=${rowId}`);
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300)
      return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
    if (status >= 300 && status < 400)
      return "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20";
    if (status >= 400)
      return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
    return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20";
  };

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300)
      return (
        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
      );
    if (status >= 400)
      return <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />;
    return <Activity className="h-4 w-4 text-gray-600 dark:text-gray-400" />;
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300";
      case "POST":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300";
      case "PUT":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300";
      case "DELETE":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300";
      case "PATCH":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300";
      default:
        return "bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card className="mb-4 border-l-4 border-l-chart-2 dark:border-l-emerald-400">
      <EventCardHeard
        eventType={event.eventType}
        eventId={event.eventId}
        textColor="text-chart-2 dark:text-emerald-300"
        bgColor="bg-chart-2/10 dark:bg-emerald-900/20"
        icon={<Activity className="h-5 w-5" />}
      />
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium shrink-0">事件ID:</span>
            <span className="text-muted-foreground font-mono text-xs">
              {event.eventId}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium shrink-0">发生时间:</span>
            <span className="text-muted-foreground">
              {dayjs(Number(event.triggerTime)).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium shrink-0">发送时间:</span>
          <span className="text-muted-foreground">
            {dayjs(Number(event.sendTime)).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <Globe className="h-4 w-4 text-muted-foreground mt-0.5" />
          <span className="font-medium shrink-0">页面URL:</span>
          <span
            title="点击复制"
            className="text-blue-600 dark:text-blue-400 break-all cursor-pointer"
            onClick={() => CopyText(event.triggerPageUrl)}
          >
            {event.triggerPageUrl}
          </span>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Activity className="h-4 w-4 text-chart-2 dark:text-emerald-400" />
            <span className="font-medium text-chart-2 dark:text-emerald-300">
              请求详情
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2 text-sm">
              <span className="font-medium shrink-0">请求URL:</span>
              <span
                title="点击复制"
                className="text-blue-600 dark:text-blue-400 break-all cursor-pointer"
                onClick={() => CopyText(event.requestUrl)}
              >
                {event.requestUrl}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm shrink-0">方法:</span>
                <span
                  className={`text-xs px-2 py-1 rounded font-medium ${getMethodColor(
                    event.requestMethod
                  )}`}
                >
                  {event.requestMethod}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">类型:</span>
                <span className="text-xs bg-secondary px-2 py-1 rounded">
                  {event.requestType}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {getStatusIcon(event.responseStatus)}
                <span className="font-medium text-sm">状态:</span>
                <span
                  className={`text-xs px-2 py-1 rounded font-medium ${getStatusColor(
                    event.responseStatus
                  )}`}
                >
                  {event.responseStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {event.duration && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 text-sm">
              <Timer className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="font-medium">请求耗时:</span>
              <span className="text-blue-700 dark:text-blue-300 font-medium">
                {event.duration}ms
              </span>
            </div>
          </div>
        )}

        {event.errMessage && (
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 text-sm mb-2">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="font-medium text-red-800 dark:text-red-300">
                错误信息
              </span>
              <Copy
                className="h-4 w-4 text-muted-foreground cursor-pointer"
                onClick={() => CopyText(event.errMessage || "无")}
              />
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700 text-sm text-foreground">
              {event.errMessage}
            </div>
          </div>
        )}

        {event.recordscreen && !isScreen && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 text-sm mb-2">
              <Video className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-blue-800 dark:text-blue-300">
                录屏回放
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setOpen(false);
                handleViewRecordscreen(event.id);
              }}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-700"
            >
              <ExternalLink className="h-4 w-4" />
              查看录屏回放
            </Button>
          </div>
        )}

        {event.params && Object.keys(event.params).length > 0 && (
          <div className="bg-secondary p-3 rounded-lg">
            <div className="font-medium text-sm mb-2">请求参数:</div>
            <pre className="text-xs bg-background p-2 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto">
              {JSON.stringify(event.params, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventRequestPage;
