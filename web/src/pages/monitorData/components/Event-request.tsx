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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import EventCardHeard from "./event-card-heard";

interface EventRequestProps {
  event: EventRequest;
  id: string;
}

const EventRequestPage = ({ event, id }: EventRequestProps) => {
  const navigate = useNavigate();

  const handleViewRecordscreen = (rowId: string) => {
    navigate(`/recordscreen?rowId=${rowId}`);
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-600 bg-green-50";
    if (status >= 300 && status < 400) return "text-yellow-600 bg-yellow-50";
    if (status >= 400) return "text-red-600 bg-red-50";
    return "text-gray-600 bg-gray-50";
  };

  const getStatusIcon = (status: number) => {
    if (status >= 200 && status < 300)
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (status >= 400) return <XCircle className="h-4 w-4 text-red-600" />;
    return <Activity className="h-4 w-4 text-gray-600" />;
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-800";
      case "POST":
        return "bg-green-100 text-green-800";
      case "PUT":
        return "bg-yellow-100 text-yellow-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      case "PATCH":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="mb-4 border-l-4 border-l-chart-2">
      <EventCardHeard
        eventType={event.eventType}
        eventId={event.eventId}
        textColor="text-chart-2"
        bgColor="bg-chart-2/10"
        icon={<Activity className="h-5 w-5" />}
      />
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4 text-gray-500" />
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

        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 text-sm mb-3">
            <Activity className="h-4 w-4 text-chart-2" />
            <span className="font-medium text-chart-2">请求详情</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2 text-sm">
              <span className="font-medium">请求URL:</span>
              <span className="text-blue-600 break-all">
                {event.requestUrl}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">方法:</span>
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
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
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
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Timer className="h-4 w-4 text-blue-600" />
              <span className="font-medium">请求耗时:</span>
              <span className="text-blue-700 font-medium">
                {event.duration}ms
              </span>
            </div>
          </div>
        )}

        {event.errMessage && (
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="flex items-center gap-2 text-sm mb-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="font-medium text-red-800">错误信息</span>
            </div>
            <div className="bg-white p-2 rounded border text-sm text-gray-700">
              {event.errMessage}
            </div>
          </div>
        )}

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
            <div className="font-medium text-sm mb-2">请求参数:</div>
            <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
              {JSON.stringify(event.params, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventRequestPage;
