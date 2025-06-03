import { EventClick } from "@/types";
import dayjs from "dayjs";
import { MousePointer2, Clock, Globe, Target, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EventClickProps {
  event: EventClick;
}

const EventClickPage = ({ event }: EventClickProps) => {
  return (
    <Card className="mb-4 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <MousePointer2 className="h-5 w-5" />
          点击事件
          <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {event.eventType}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Target className="h-4 w-4 text-gray-500" />
            <span className="font-medium">事件ID:</span>
            <span className="text-gray-600 font-mono text-xs">
              {event.eventId}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="font-medium">发生时间:</span>
            <span className="text-gray-600">
              {dayjs(event.triggerTime).format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="font-medium">发送时间:</span>
          <span className="text-gray-600">
            {dayjs(event.sendTime).format("YYYY-MM-DD HH:mm:ss")}
          </span>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <Globe className="h-4 w-4 text-gray-500 mt-0.5" />
          <span className="font-medium">页面URL:</span>
          <span className="text-blue-600 break-all">
            {event.triggerPageUrl}
          </span>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm mb-2">
            <Target className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-800">事件详情</span>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">事件名:</span>
              <span className="ml-2 text-gray-700">{event.title}</span>
            </div>
            <div>
              <span className="font-medium">元素路径:</span>
              <code className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                {event.elementPath}
              </code>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm mb-2">
            <MapPin className="h-4 w-4 text-gray-600" />
            <span className="font-medium">点击位置</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">X坐标:</span>
              <span className="ml-2 text-gray-700">{event.x}px</span>
            </div>
            <div>
              <span className="font-medium">Y坐标:</span>
              <span className="ml-2 text-gray-700">{event.y}px</span>
            </div>
          </div>
        </div>

        {event.params && Object.keys(event.params).length > 0 && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="font-medium text-sm mb-2">事件参数:</div>
            <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
              {JSON.stringify(event.params, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventClickPage;
