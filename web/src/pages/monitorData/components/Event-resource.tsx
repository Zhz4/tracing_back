import { EventResource } from "@/types";
import dayjs from "dayjs";
import {
  Download,
  Clock,
  Globe,
  FileText,
  Activity,
  HardDrive,
  Timer,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EventCardHeard from "./event-card-heard";
import { handleCheck } from "@/utils/handleCheck";

interface EventResourceProps {
  event: EventResource;
}

const EventResourcePage = ({ event }: EventResourceProps) => {
  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "-";
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getInitiatorTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "script":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300";
      case "css":
      case "link":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300";
      case "img":
      case "image":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300";
      case "fetch":
      case "xmlhttprequest":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300";
      case "other":
        return "bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300";
      default:
        return "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300";
    }
  };

  const getInitiatorTypeText = (type: string) => {
    switch (type.toLowerCase()) {
      case "script":
        return "JavaScript";
      case "css":
      case "link":
        return "样式表";
      case "img":
      case "image":
        return "图片";
      case "fetch":
        return "Fetch API";
      case "xmlhttprequest":
        return "XHR请求";
      case "other":
        return "其他";
      default:
        return type;
    }
  };

  return (
    <Card className="mb-4 border-l-4 border-l-chart-1 dark:border-l-indigo-400">
      <EventCardHeard
        eventType={event.eventType}
        eventId={event.eventId}
        textColor="text-chart-1 dark:text-indigo-300"
        bgColor="bg-chart-1/10 dark:bg-indigo-900/20"
        icon={<Download className="h-5 w-5" />}
      />
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Download className="h-4 w-4 text-muted-foreground" />
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
          <span className="text-blue-600 dark:text-blue-400 break-all">
            {event.triggerPageUrl}
          </span>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Download className="h-4 w-4 text-chart-1 dark:text-indigo-400" />
            <span className="font-medium text-chart-1 dark:text-indigo-300">
              资源详情
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2 text-sm">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium shrink-0 ">资源URL:</span>
              <span className="text-blue-600 dark:text-blue-400 break-all">
                {event.requestUrl}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm shrink-0">资源类型:</span>
              <span
                className={`text-xs px-2 py-1 rounded font-medium ${getInitiatorTypeColor(
                  event.initiatorType
                )}`}
              >
                {getInitiatorTypeText(event.initiatorType)}
              </span>
              <span className="text-xs text-muted-foreground">
                ({event.initiatorType})
              </span>
            </div>
          </div>
        </div>

        <div className="bg-secondary p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm mb-3">
            <HardDrive className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium shrink-0">数据传输</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="font-medium shrink-0">传输大小:</span>
              <span className="ml-2 text-foreground">
                {formatFileSize(event.transferSize)}
              </span>
            </div>
            <div>
              <span className="font-medium shrink-0">压缩后:</span>
              <span className="ml-2 text-foreground">
                {formatFileSize(event.encodedBodySize)}
              </span>
            </div>
            <div>
              <span className="font-medium shrink-0">解压后:</span>
              <span className="ml-2 text-foreground">
                {formatFileSize(event.decodedBodySize)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Timer className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-blue-800 dark:text-blue-300">
              加载时间
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="font-medium shrink-0">总耗时:</span>
              <span className="ml-2 text-blue-700 dark:text-blue-300 font-medium">
                {handleCheck(event.duration, `${event.duration}ms`)}
              </span>
            </div>
            <div>
              <span className="font-medium shrink-0">开始时间:</span>
              <span className="ml-2 text-foreground">{event.startTime}ms</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="font-medium text-green-800 dark:text-green-300">
              详细时间线
            </span>
          </div>

          <div className="space-y-2 text-sm">
            {event.redirectStart > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <span className="font-medium shrink-0">重定向开始:</span>
                  <span className="ml-2 text-foreground">
                    {event.redirectStart.toFixed(2)}ms
                  </span>
                </div>
                <div>
                  <span className="font-medium shrink-0">重定向结束:</span>
                  <span className="ml-2 text-foreground">
                    {handleCheck(event.redirectEnd, event.redirectEnd + "ms")}
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <span className="font-medium shrink-0">开始获取:</span>
                <span className="ml-2 text-foreground">
                  {handleCheck(event.fetchStart, event.fetchStart + "ms")}
                </span>
              </div>
              <div>
                <span className="font-medium shrink-0">DNS查询开始:</span>
                <span className="ml-2 text-foreground">
                  {handleCheck(
                    event.domainLookupStart,
                    event.domainLookupStart + "ms"
                  )}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <span className="font-medium shrink-0">DNS查询结束:</span>
                <span className="ml-2 text-foreground">
                  {handleCheck(
                    event.domainLookupEnd,
                    event.domainLookupEnd + "ms"
                  )}
                </span>
              </div>
              <div>
                <span className="font-medium shrink-0">连接开始:</span>
                <span className="ml-2 text-foreground">
                  {handleCheck(event.connectStart, event.connectStart + "ms")}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <span className="font-medium shrink-0">连接完成:</span>
                <span className="ml-2 text-foreground">
                  {handleCheck(event.connectEnd, event.connectEnd + "ms")}
                </span>
              </div>
              <div>
                <span className="font-medium shrink-0">请求开始:</span>
                <span className="ml-2 text-foreground">
                  {handleCheck(event.requestStart, event.requestStart + "ms")}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <span className="font-medium shrink-0">响应开始:</span>
                <span className="ml-2 text-foreground">
                  {handleCheck(event.responseStart, event.responseStart + "ms")}
                </span>
              </div>
              <div>
                <span className="font-medium shrink-0">响应完成:</span>
                <span className="ml-2 text-foreground">
                  {handleCheck(event.responseEnd, event.responseEnd + "ms")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventResourcePage;
