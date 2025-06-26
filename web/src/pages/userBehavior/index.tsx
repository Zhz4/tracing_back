import { useLocation, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Globe } from "lucide-react";
import UserActivityChart from "./components/UserActivityChart";
import UserPathAnalysis from "./components/UserPathAnalysis";
import UserEventStats from "./components/UserEventStats";
import { getUserOverviewStats } from "@/api/analyze";
import { useQuery } from "@tanstack/react-query";
import { UserOverviewStatsResponse } from "@/api/analyze/type";
import { getPlatformInfo } from "../monitorData/components/columns/platform-cell";
import { BrowserVendor } from "../monitorData/components/columns/vendor-cell";
import { formatMilliseconds } from "@/utils/time";
import { useCounterStore } from "@/stores/tab";
import { useEffect } from "react";

const UserBehaviorAnalysis = () => {
  const { pathname, search } = useLocation();
  const { userUuid } = useParams();
  const { updateTabName } = useCounterStore();
  // 获取用户概览统计数据
  const { data: userOverviewStats, isLoading: isOverviewLoading } =
    useQuery<UserOverviewStatsResponse>({
      queryKey: ["userOverviewStats", userUuid],
      queryFn: () => getUserOverviewStats(userUuid || ""),
      enabled: !!userUuid,
      refetchOnWindowFocus: false,
      retry: false,
    });
  useEffect(() => {
    if (isOverviewLoading === false && userOverviewStats?.userName) {
      updateTabName(pathname + search, userOverviewStats?.userName || "");
    }
  }, [isOverviewLoading]);

  return (
    <div className="container mx-auto space-y-6">
      {/* 用户基本信息卡片 */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            {isOverviewLoading ? (
              <>
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-8 w-32" />
                </div>
              </>
            ) : (
              <>
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">
                    {userOverviewStats?.userName?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-2xl">
                      {userOverviewStats?.userName}
                    </CardTitle>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isOverviewLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="text-center space-y-2">
                  <Skeleton className="h-8 w-12 mx-auto" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {userOverviewStats?.totalSessions || 0}
                </div>
                <div className="text-sm text-muted-foreground">总会话数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {userOverviewStats?.totalPageViews || 0}
                </div>
                <div className="text-sm text-muted-foreground">页面浏览量</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {userOverviewStats?.totalEvents || 0}
                </div>
                <div className="text-sm text-muted-foreground">总事件数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {formatMilliseconds(
                    userOverviewStats?.avgSessionDuration || 0,
                    false
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  平均会话时长
                </div>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="flex items-center gap-1">
                  {getPlatformInfo(userOverviewStats?.deviceType || "").icon}
                  <span className="font-medium">
                    {getPlatformInfo(userOverviewStats?.deviceType || "").name}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">设备类型</div>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="flex items-center gap-1">
                  <Globe className="h-5 w-5 text-indigo-600" />
                  <span className="font-medium">
                    {
                      BrowserVendor[
                        userOverviewStats?.browserType as keyof typeof BrowserVendor
                      ].name
                    }
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">浏览器</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 分析内容标签页 */}
      <Tabs defaultValue="activity" className="space-y-3">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">活跃度分析</TabsTrigger>
          <TabsTrigger value="events">事件统计</TabsTrigger>
          <TabsTrigger value="path">页面分析</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-3">
          <UserActivityChart />
        </TabsContent>

        <TabsContent value="events" className="space-y-3">
          <UserEventStats />
        </TabsContent>

        <TabsContent value="path" className="space-y-3">
          <UserPathAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserBehaviorAnalysis;
