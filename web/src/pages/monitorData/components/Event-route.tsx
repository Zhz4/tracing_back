import { EventRoute } from "@/types";
import dayjs from "dayjs";
import {
  Navigation,
  Clock,
  Globe,
  FileText,
  ArrowRight,
  RotateCcw,
  ArrowLeft,
  HelpCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EventCardHeard from "./event-card-heard";
import { formatMilliseconds } from "@/utils/time";

interface EventRouteProps {
  event: EventRoute;
}

const EventRoutePage = ({ event }: EventRouteProps) => {
  const getActionIcon = (action: string) => {
    switch (action) {
      case "navigate":
        return (
          <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        );
      case "reload":
        return (
          <RotateCcw className="h-4 w-4 text-green-600 dark:text-green-400" />
        );
      case "back_forward":
        return (
          <ArrowLeft className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        );
      default:
        return (
          <HelpCircle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        );
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "navigate":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300";
      case "reload":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300";
      case "back_forward":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300";
      default:
        return "bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300";
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case "navigate":
        return "导航跳转";
      case "reload":
        return "页面重载";
      case "back_forward":
        return "前进/后退";
      case "reserved":
        return "其他来源";
      default:
        return action;
    }
  };

  return (
    <Card className="mb-4 border-l-4 border-l-purple-500 dark:border-l-purple-400">
      <EventCardHeard
        eventType={event.eventType}
        eventId={event.eventId}
        textColor="text-purple-700 dark:text-purple-300"
        bgColor="bg-purple-100 dark:bg-purple-900/20"
        icon={<Navigation className="h-5 w-5" />}
      />
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Navigation className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">事件ID:</span>
            <span className="text-muted-foreground font-mono text-xs">
              {event.eventId}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">发生时间:</span>
            <span className="text-muted-foreground">
              {dayjs(Number(event.triggerTime)).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">发送时间:</span>
          <span className="text-muted-foreground">
            {dayjs(Number(event.sendTime)).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Navigation className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span className="font-medium text-purple-800 dark:text-purple-300">
              页面信息
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2 text-sm">
              <Globe className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="font-medium">当前页面:</span>
              <span className="text-blue-600 dark:text-blue-400 break-all">
                {event.triggerPageUrl}
              </span>
            </div>

            <div className="flex items-start gap-2 text-sm">
              <ArrowLeft className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="font-medium">来源页面:</span>
              <span className="text-blue-600 dark:text-blue-400 break-all">
                {event.referer || "直接访问"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">页面标题:</span>
              <span className="text-foreground">{event.title}</span>
            </div>

            {event.durationTime && (
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">停留时间:</span>
                <span className="text-foreground">
                  {formatMilliseconds(event.durationTime)}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-secondary p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm mb-2">
            {getActionIcon(event.action)}
            <span className="font-medium">加载来源</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs px-2 py-1 rounded font-medium ${getActionColor(
                event.action
              )}`}
            >
              {getActionText(event.action)}
            </span>
            <span className="text-xs text-muted-foreground">
              ({event.action})
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventRoutePage;
