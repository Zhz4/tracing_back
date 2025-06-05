import { Button } from "@/components/ui/button";
import { EventError } from "@/types";
import dayjs from "dayjs";
import {
  ExternalLink,
  AlertTriangle,
  Clock,
  Globe,
  Bug,
  MapPin,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import EventCardHeard from "./event-card-heard";

interface EventErrorProps {
  event: EventError;
  id: string;
}

const EventErrorPage = ({ event, id }: EventErrorProps) => {
  const navigate = useNavigate();

  const handleViewRecordscreen = (rowId: string) => {
    navigate(`/recordscreen?rowId=${rowId}`);
  };

  return (
    <Card className="mb-4 border-l-4 border-l-red-500 dark:border-l-red-400">
      <EventCardHeard
        eventType={event.eventType}
        eventId={event.eventId}
        textColor="text-red-700 dark:text-red-300"
        bgColor="bg-red-100 dark:bg-red-900/20"
        icon={<AlertTriangle className="h-5 w-5" />}
      />
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Bug className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium shrink-0">事件ID:</span>
            <span className="text-destructive font-mono text-xs">
              {event.eventId}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium shrink-0">发生时间:</span>
            <span className="text-destructive">
              {dayjs(event.triggerTime).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium shrink-0">发送时间:</span>
          <span className="text-destructive">
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

        <div className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 p-3 rounded-lg border">
          <div className="flex items-center gap-2 text-sm mb-2">
            <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="font-medium text-red-800 dark:text-red-300">
              错误信息
            </span>
          </div>
          <div className="space-y-2">
            <div className="bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-700">
              <div className="text-sm font-medium text-destructive mb-1">
                错误描述:
              </div>
              <div className="text-sm text-secondary-foreground">
                {event.errMessage || "无"}
              </div>
            </div>
            <div className="bg-background p-2 rounded border border-gray-200 dark:border-gray-700">
              <div className="text-sm font-medium text-destructive mb-1">
                完整的错误信息:
              </div>
              <pre className="text-xs text-destructive overflow-x-auto whitespace-pre-wrap">
                {event.errStack || "无"}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-secondary p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm mb-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium shrink-0">错误位置</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium shrink-0">行号:</span>
              <span className="ml-2 text-muted-foreground">
                {event.line || "未知"}
              </span>
            </div>
            <div>
              <span className="font-medium shrink-0">列号:</span>
              <span className="ml-2 text-muted-foreground">
                {event.col || "未知"}
              </span>
            </div>
          </div>
        </div>

        {event.recordscreen && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 p-3 rounded-lg border">
            <div className="flex items-center gap-2 text-sm mb-2">
              <Video className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-blue-800 dark:text-blue-300">
                录屏回放
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewRecordscreen(id)}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-700"
            >
              <ExternalLink className="h-4 w-4" />
              查看录屏回放
            </Button>
          </div>
        )}

        {event.params && Object.keys(event.params).length > 0 && (
          <div className="bg-background p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="font-medium text-sm mb-2 shrink-0">事件参数:</div>
            <pre className="text-xs bg-muted p-2 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto">
              {JSON.stringify(event.params, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventErrorPage;
