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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventConst } from "@/constants";

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
    <Card className="mb-4 border-l-4 border-l-red-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-red-700">
          <AlertTriangle className="h-5 w-5" />
          {EventConst[event.eventType as keyof typeof EventConst]}
          <span className="ml-auto text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
            {event.eventType}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Bug className="h-4 w-4 text-gray-500" />
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

        <div className="bg-red-50 p-3 rounded-lg border border-red-200">
          <div className="flex items-center gap-2 text-sm mb-2">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="font-medium text-red-800">错误信息</span>
          </div>
          <div className="space-y-2">
            <div className="bg-white p-2 rounded border">
              <div className="text-sm font-medium text-red-700 mb-1">
                错误描述:
              </div>
              <div className="text-sm text-gray-700">{event.errMessage}</div>
            </div>
            <div className="bg-white p-2 rounded border">
              <div className="text-sm font-medium text-red-700 mb-1">
                错误堆栈:
              </div>
              <pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
                {event.errStack}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2 text-sm mb-2">
            <MapPin className="h-4 w-4 text-gray-600" />
            <span className="font-medium">错误位置</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">行号:</span>
              <span className="ml-2 text-gray-700">{event.line}</span>
            </div>
            <div>
              <span className="font-medium">列号:</span>
              <span className="ml-2 text-gray-700">{event.col}</span>
            </div>
          </div>
        </div>

        {event.recordscreen && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-sm mb-2">
              <Video className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-800">录屏回放</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewRecordscreen(id)}
              className="flex items-center gap-2 bg-white hover:bg-blue-50"
            >
              <ExternalLink className="h-4 w-4" />
              查看录屏回放
            </Button>
          </div>
        )}

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

export default EventErrorPage;
