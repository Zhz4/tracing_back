import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import { getUser24HourActive, getUserWeeklyActivityTrend } from "@/api/analyze";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  HourlyActivityResponse,
  WeeklyActivityTrendResponse,
} from "@/api/analyze/type";
import dayjs from "dayjs";
import { formatMilliseconds } from "@/utils/time";
import { useParams } from "react-router-dom";

// 活跃度趋势分析骨架屏
const TrendAnalysisSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 border rounded-lg space-y-2">
          <Skeleton className="h-8 w-16 mx-auto" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
        <div className="text-center p-4 border rounded-lg space-y-2">
          <Skeleton className="h-8 w-16 mx-auto" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
      </div>
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex justify-between items-center">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
};

const UserActivityChart = () => {
  const { userUuid } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());
  // 获取可以查看的最早日期（7天前）
  const getMinDate = () => {
    return dayjs().subtract(6, "day");
  };
  // 获取可以查看的最晚日期（今天）
  const getMaxDate = () => {
    return dayjs();
  };
  // 切换到前一天
  const handlePreviousDay = () => {
    const previousDay = currentDate.subtract(1, "day");
    if (previousDay.isSameOrAfter(getMinDate(), "day")) {
      setCurrentDate(previousDay);
    }
  };
  // 切换到下一天
  const handleNextDay = () => {
    const nextDay = currentDate.add(1, "day");
    if (nextDay.isSameOrBefore(getMaxDate(), "day")) {
      setCurrentDate(nextDay);
    }
  };
  // 用户24小时活跃度分布
  const { data: activityData } = useQuery<HourlyActivityResponse[]>({
    queryKey: ["user24HourActive", userUuid, currentDate.valueOf()],
    queryFn: () => getUser24HourActive(userUuid || "", currentDate.valueOf()),
    enabled: !!userUuid,
    retry: false,
    placeholderData: keepPreviousData,
    staleTime: 0,
    gcTime: 0,
  });
  // 用户近7天用户活跃度变化趋势
  const { data: weeklyActivityTrendData, isLoading: isTrendLoading } =
    useQuery<WeeklyActivityTrendResponse>({
      queryKey: ["userWeeklyActivityTrend", userUuid],
      queryFn: () => getUserWeeklyActivityTrend(userUuid || ""),
      staleTime: 24 * 60 * 60 * 1000, // 24小时不重新获取
      gcTime: 24 * 60 * 60 * 1000, // 24小时后清除缓存
      enabled: !!userUuid,
      retry: false,
    });
  // 延迟渲染图表，确保容器已经准备好
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const chartConfig = {
    pageViews: {
      label: "页面浏览",
      color: "var(--chart-1)",
    },
    events: {
      label: "用户事件",
      color: "var(--chart-3)",
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
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousDay}
                disabled={currentDate.isSameOrBefore(getMinDate(), "day")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[100px] text-center">
                {currentDate.format("M月D日 ddd")}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextDay}
                disabled={currentDate.isSameOrAfter(getMaxDate(), "day")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">可查看近7天数据</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            {isVisible && (
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
          {isTrendLoading ? (
            <TrendAnalysisSkeleton />
          ) : (
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
                    {formatMilliseconds(
                      weeklyActivityTrendData?.averageOnlineTime || 0,
                      false
                    )}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserActivityChart;
