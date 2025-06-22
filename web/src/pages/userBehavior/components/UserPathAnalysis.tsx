import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Home,
  Settings,
  BarChart3,
  Users,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPageVisitStats } from "@/api/analyze";
import { PageVisitStatsWrapperResponse } from "@/api/analyze/type";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

// 扩展 dayjs 插件
dayjs.extend(duration);

const UserPathAnalysis = () => {
  const { userUuid } = useParams();
  // 获取页面访问统计数据
  const { data: pageStatsData, isLoading: isPageStatsLoading } =
    useQuery<PageVisitStatsWrapperResponse>({
      queryKey: ["pageVisitStats", userUuid],
      queryFn: () => getPageVisitStats(userUuid || ""),
      enabled: !!userUuid,
      refetchOnWindowFocus: false,
      retry: false,
    });

  // 使用 dayjs 转换平均停留时间（毫秒转为分钟和秒）
  const formatStayTime = (timeMs: number) => {
    const dur = dayjs.duration(timeMs);
    const minutes = Math.floor(dur.asMinutes());
    const seconds = dur.seconds();
    return `${minutes}m ${seconds}s`;
  };

  // 模拟用户路径数据
  const userPaths = [
    {
      id: 1,
      path: [
        { page: "首页", icon: Home, visits: 45 },
        { page: "数据分析", icon: BarChart3, visits: 32 },
        { page: "用户管理", icon: Users, visits: 28 },
        { page: "设置", icon: Settings, visits: 15 },
      ],
      frequency: 28,
      conversionRate: "62%",
    },
    {
      id: 2,
      path: [
        { page: "首页", icon: Home, visits: 38 },
        { page: "用户管理", icon: Users, visits: 35 },
        { page: "数据分析", icon: BarChart3, visits: 22 },
      ],
      frequency: 22,
      conversionRate: "58%",
    },
    {
      id: 3,
      path: [
        { page: "首页", icon: Home, visits: 25 },
        { page: "设置", icon: Settings, visits: 20 },
        { page: "数据分析", icon: BarChart3, visits: 12 },
      ],
      frequency: 18,
      conversionRate: "48%",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>用户路径分析</CardTitle>
          <CardDescription>
            用户在系统中的主要访问路径和流转情况
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {userPaths.map((pathData) => (
              <div key={pathData.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">路径 {pathData.id}</Badge>
                  <div className="flex gap-4 text-sm">
                    <span>
                      频次: <strong>{pathData.frequency}</strong>
                    </span>
                    <span>
                      转化率: <strong>{pathData.conversionRate}</strong>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto">
                  {pathData.path.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 flex-shrink-0"
                    >
                      <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-2">
                        <step.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{step.page}</span>
                        <Badge variant="outline" className="text-xs">
                          {step.visits}
                        </Badge>
                      </div>
                      {index < pathData.path.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>页面访问统计</CardTitle>
          <CardDescription>
            各页面的访问量、跳出率和平均停留时间
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPageStatsLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Loader2 className="animate-spin" />
                加载中...
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {pageStatsData?.pageStats &&
                pageStatsData.pageStats.length > 0 ? (
                  pageStatsData.pageStats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="font-medium">{stat.title}</div>
                      <div className="flex gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-blue-600">
                            {stat.visitCount}
                          </div>
                          <div className="text-muted-foreground">访问量</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-orange-600">
                            {stat.bounceRate}%
                          </div>
                          <div className="text-muted-foreground">跳出率</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-green-600">
                            {formatStayTime(stat.avgStayTimeMs)}
                          </div>
                          <div className="text-muted-foreground">停留时间</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    暂无页面访问数据
                  </div>
                )}
              </div>
              {pageStatsData && (
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {pageStatsData.totalVisits}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        总访问量
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">
                        {pageStatsData.avgBounceRate}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        平均跳出率
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatStayTime(pageStatsData.avgStayTimeMs)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        平均停留时间
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPathAnalysis;
