import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, Clock, Eye, TrendingDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPageVisitStats } from "@/api/analyze";
import { PageVisitStatsWrapperResponse } from "@/api/analyze/type";
import { formatMilliseconds } from "@/utils/time";

// 页面访问统计骨架屏
const PageStatsAnalysisSkeleton = () => {
  return (
    <>
      {/* 总体统计概览骨架屏 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 详细页面统计骨架屏 */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-32 mb-4" />
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-8" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex gap-6">
              <div className="text-center space-y-2">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-3 w-10" />
              </div>
              <div className="text-center space-y-2">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-3 w-10" />
              </div>
              <div className="text-center space-y-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          页面访问统计
        </CardTitle>
        <CardDescription>
          各页面的访问量、跳出率和平均停留时间分析
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPageStatsLoading ? (
          <PageStatsAnalysisSkeleton />
        ) : (
          <>
            {/* 总体统计概览 */}
            {pageStatsData && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Eye className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {pageStatsData.totalVisits}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        总访问量
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4 border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500 rounded-lg">
                      <TrendingDown className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">
                        {pageStatsData.avgBounceRate}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        平均跳出率
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatMilliseconds(pageStatsData.avgStayTimeMs, false)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        平均停留时间
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {formatMilliseconds(
                          pageStatsData.totalStayTimeMs,
                          false
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        总停留时间
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 详细页面统计 */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-4">页面详细统计</h3>
              {pageStatsData?.pageStats &&
              pageStatsData.pageStats.length > 0 ? (
                pageStatsData.pageStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-xs">
                        {index + 1}
                      </Badge>
                      <div className="font-medium text-base">{stat.title}</div>
                    </div>
                    <div className="flex gap-6 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-blue-600 text-lg">
                          {stat.visitCount}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          访问量
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-orange-600 text-lg">
                          {stat.bounceRate}%
                        </div>
                        <div className="text-muted-foreground text-xs">
                          跳出率
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-green-600 text-lg">
                          {formatMilliseconds(stat.avgStayTimeMs, false)}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          平均停留时间
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-lg">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <div className="text-base">暂无页面访问数据</div>
                  <div className="text-sm mt-1">用户还未产生页面访问记录</div>
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default UserPathAnalysis;
