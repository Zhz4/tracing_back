import { EventClick } from "@/types";
import dayjs from "dayjs";
import { MousePointer2, Clock, Globe, Target, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EventCardHeard from "./event-card-heard";

interface EventClickProps {
  event: EventClick;
}

const EventClickPage = ({ event }: EventClickProps) => {
  return (
    <Card className="mb-4 border-l-4 border-l-blue-500 dark:border-l-blue-400">
      <EventCardHeard
        eventType={event.eventType}
        eventId={event.eventId}
        textColor="text-blue-700 dark:text-blue-300"
        bgColor="bg-blue-100 dark:bg-blue-900/20"
        icon={<MousePointer2 className="h-5 w-5" />}
      />
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 text-muted-foreground" />
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

        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 text-sm mb-2">
            <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="font-medium text-blue-800 dark:text-blue-300">
              事件详情
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium shrink-0">事件名:</span>
              <span className="ml-2 text-foreground">{event.title}</span>
            </div>
            <div>
              <span className="font-medium shrink-0">元素路径:</span>
              <code className="ml-2 text-xs bg-background dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                {event.elementPath}
              </code>
            </div>
          </div>
        </div>

        <div className="bg-secondary p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm mb-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium shrink-0">点击位置</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium shrink-0">X坐标:</span>
              <span className="ml-2 text-foreground">{event.x}px</span>
            </div>
            <div>
              <span className="font-medium shrink-0">Y坐标:</span>
              <span className="ml-2 text-foreground">{event.y}px</span>
            </div>
          </div>
        </div>

        {event.params && Object.keys(event.params).length > 0 && (
          <div className="bg-secondary p-3 rounded-lg">
            <div className="font-medium text-sm mb-2 shrink-0">事件参数:</div>
            <pre className="text-xs bg-background p-2 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto">
              {JSON.stringify(event.params, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventClickPage;
