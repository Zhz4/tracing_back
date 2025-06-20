import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import { getUser24HourActive, getUserWeeklyActivityTrend } from "@/api/analyze";
import { useQuery } from "@tanstack/react-query";
import {
  HourlyActivityResponse,
  WeeklyActivityTrendResponse,
} from "@/api/analyze/type";
import { useParams } from "react-router-dom";

const UserActivityChart = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { userUuid } = useParams();
  // 用户24小时活跃度分布
  const { data: activityData } = useQuery<HourlyActivityResponse[]>({
    queryKey: ["user24HourActive", userUuid],
    queryFn: () => getUser24HourActive(userUuid || ""),
    staleTime: 24 * 60 * 60 * 1000, // 24小时不重新获取
    gcTime: 24 * 60 * 60 * 1000, // 24小时后清除缓存
    enabled: !!userUuid,
    refetchOnWindowFocus: false,
    retry: false,
  });
  // 用户近7天用户活跃度变化趋势
  const { data: weeklyActivityTrendData } =
    useQuery<WeeklyActivityTrendResponse>({
      queryKey: ["userWeeklyActivityTrend", userUuid],
      queryFn: () => getUserWeeklyActivityTrend(userUuid || ""),
      staleTime: 24 * 60 * 60 * 1000, // 24小时不重新获取
      gcTime: 24 * 60 * 60 * 1000, // 24小时后清除缓存
      enabled: !!userUuid,
      refetchOnWindowFocus: false,
      retry: false,
    });
  // 延迟渲染图表，确保容器已经准备好
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const chartConfig = {
    pageViews: {
      label: "页面浏览",
      color: "hsl(var(--chart-1))",
    },
    events: {
      label: "用户事件",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            24小时活跃度分布
          </CardTitle>
          <CardDescription>
            展示用户在一天中不同时间段的活跃程度
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            {isVisible ? (
              <ChartContainer config={chartConfig} className="w-full h-full">
                <BarChart
                  data={activityData || []}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="hour"
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="pageViews"
                    fill="var(--color-pageViews)"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="events"
                    fill="var(--color-events)"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted/10 rounded-lg">
                <div className="text-sm text-muted-foreground">
                  加载图表中...
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            活跃度趋势分析
          </CardTitle>
          <CardDescription>近7天的用户活跃度变化趋势</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {weeklyActivityTrendData?.pageViewGrowth}%
                </div>
                <div className="text-sm text-muted-foreground">
                  页面浏览增长
                </div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {weeklyActivityTrendData?.eventGrowth}%
                </div>
                <div className="text-sm text-muted-foreground">
                  事件交互增长
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">最活跃时段</span>
                <span className="font-medium">
                  {weeklyActivityTrendData?.mostActiveHour}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">平均在线时长</span>
                <span className="font-medium">
                  {weeklyActivityTrendData?.averageOnlineTime}分
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">活跃天数</span>
                <span className="font-medium">
                  {weeklyActivityTrendData?.activeDays}天
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserActivityChart;
