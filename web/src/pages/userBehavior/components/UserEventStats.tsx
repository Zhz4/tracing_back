import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, Pie, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  MousePointer,
  Bug,
  Terminal,
  ArrowRight,
  Clock,
  Zap,
  Globe,
  XCircle,
  Image,
  Video,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useDeferredValue, useState } from "react";
import { EventStatusEnum } from "@/constants";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getUserEventStats } from "@/api/analyze";
import { UserEventStatsResponse } from "@/api/analyze/type";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router-dom";

const UserEventStats = () => {
  const { userUuid } = useParams();
  const [showAll, setShowAll] = useState(false);

  // 获取用户事件统计数据
  const {
    data: userEventData,
    isLoading,
    error,
  } = useQuery<UserEventStatsResponse>({
    queryKey: ["userEventStats", userUuid],
    queryFn: () => getUserEventStats(userUuid || ""),
    enabled: !!userUuid,
    refetchOnWindowFocus: false,
    retry: false,
  });

  // 使用 useDeferredValue 延迟渲染图表，优先级最低
  const deferredUserEventData = useDeferredValue(userEventData);

  // 事件类型图标映射
  const getEventIcon = (eventName: string) => {
    const iconMap: Record<string, React.ReactElement> = {
      [EventStatusEnum.点击事件]: <MousePointer className="h-4 w-4" />,
      [EventStatusEnum.页面跳转]: <ArrowRight className="h-4 w-4" />,
      [EventStatusEnum.请求事件]: <Globe className="h-4 w-4" />,
      [EventStatusEnum.页面停留]: <Clock className="h-4 w-4" />,
      [EventStatusEnum.资源加载]: <Image className="h-4 w-4" />,
      [EventStatusEnum.代码错误]: <Bug className="h-4 w-4" />,
      [EventStatusEnum.请求失败]: <XCircle className="h-4 w-4" />,
      [EventStatusEnum.控制台错误]: <Terminal className="h-4 w-4" />,
      [EventStatusEnum.资源首次加载]: <Zap className="h-4 w-4" />,
      [EventStatusEnum.主动上报错误录屏]: <Video className="h-4 w-4" />,
    };
    return iconMap[eventName] || <Globe className="h-4 w-4" />;
  };

  // 事件类型颜色映射
  const getEventColor = (index: number) => {
    const colors = [
      "var(--chart-1)",
      "var(--chart-2)",
      "var(--chart-3)",
      "var(--chart-4)",
      "var(--chart-5)",
    ];
    return colors[index % colors.length];
  };

  // 构建事件配置数据 - 使用延迟的数据
  const eventConfigs =
    deferredUserEventData?.eventStats?.map((stat, index) => ({
      name: stat.eventName,
      value: stat.count,
      percentage: stat.percentage,
      color: getEventColor(index),
      icon: getEventIcon(stat.eventName),
    })) || [];

  // 提取图表所需的数据格式
  const eventData = eventConfigs.map(({ name, value }) => ({ name, value }));

  // 显示的事件数据：默认显示前6个，可以展开显示全部
  const showCount = 6;
  const displayedEvents = showAll
    ? eventConfigs
    : eventConfigs.slice(0, showCount);
  const hasMoreEvents = eventConfigs.length > showCount;

  // 动态生成 chartConfig
  const chartConfig = eventConfigs.reduce((config, item, index) => {
    const key = `event_${index}`;
    config[key] = {
      label: item.name,
      color: item.color,
    };
    return config;
  }, {} as Record<string, { label: string; color: string }>);

  // 从配置中提取颜色数组
  const COLORS = eventConfigs.map((config) => config.color);

  // 加载状态
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>事件类型分布</CardTitle>
            <CardDescription>用户各类操作事件的数量分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] flex items-center justify-center">
              <Skeleton className="w-48 h-48 rounded-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>事件详细统计</CardTitle>
            <CardDescription>各类事件的具体数量和占比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-4 w-12 mb-1" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 错误状态
  if (error || !userEventData) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>事件类型分布</CardTitle>
            <CardDescription>用户各类操作事件的数量分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] flex items-center justify-center text-muted-foreground">
              暂无事件数据
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>事件详细统计</CardTitle>
            <CardDescription>各类事件的具体数量和占比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              暂无统计数据
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 如果没有事件数据
  if (!eventConfigs.length) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>事件类型分布</CardTitle>
            <CardDescription>用户各类操作事件的数量分布</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[300px] flex items-center justify-center text-muted-foreground">
              该用户暂无事件记录
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>事件详细统计</CardTitle>
            <CardDescription>各类事件的具体数量和占比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              该用户暂无事件记录
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>事件类型分布</CardTitle>
          <CardDescription>用户各类操作事件的数量分布</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <Pie
                  data={eventData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {eventData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>事件详细统计</CardTitle>
          <CardDescription>各类事件的具体数量和占比</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {displayedEvents.map((event, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {event.icon}
                    <span className="font-medium text-sm">{event.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{event.value}</div>
                    <div className="text-xs text-muted-foreground">
                      {event.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {hasMoreEvents && (
            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="w-full"
              >
                {showAll ? (
                  <>
                    收起
                    <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    查看更多 ({eventConfigs.length - showCount} 个)
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          )}

          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center font-semibold">
              <span>总事件数</span>
              <span>{deferredUserEventData?.totalEvents || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserEventStats;
