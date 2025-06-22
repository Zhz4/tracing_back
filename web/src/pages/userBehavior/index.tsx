import { useParams } from "react-router-dom";
import { useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, MapPin, Monitor, MousePointer } from "lucide-react";
import { DataTable } from "@/components/table/data-table";
import { columns } from "./components/columns";
import UserActivityChart from "./components/UserActivityChart";
import UserPathAnalysis from "./components/UserPathAnalysis";
import UserEventStats from "./components/UserEventStats";
import { getUserInfo } from "@/api/trackingUser";
import { useQuery } from "@tanstack/react-query";
import { UserInfoResponse } from "@/api/trackingUser/type";

const UserBehaviorAnalysis = () => {
  const { userUuid } = useParams();
  const { data: userInfo } = useQuery<UserInfoResponse>({
    queryKey: ["userInfo", userUuid],
    queryFn: () => getUserInfo(userUuid || ""),
    enabled: !!userUuid,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // 模拟用户行为数据
  const behaviorData = [
    {
      id: "1",
      timestamp: "2024-12-12 14:25:30",
      action: "页面访问",
      target: "/dashboard",
      duration: "2m 15s",
      device: "Desktop",
    },
    {
      id: "2",
      timestamp: "2024-12-12 14:23:15",
      action: "按钮点击",
      target: "导出数据按钮",
      duration: "-",
      device: "Desktop",
    },
    {
      id: "3",
      timestamp: "2024-12-12 14:20:45",
      action: "表单提交",
      target: "用户信息表单",
      duration: "45s",
      device: "Desktop",
    },
    {
      id: "4",
      timestamp: "2024-12-12 14:18:30",
      action: "页面访问",
      target: "/settings",
      duration: "3m 20s",
      device: "Desktop",
    },
    {
      id: "5",
      timestamp: "2024-12-12 14:15:10",
      action: "搜索操作",
      target: "用户搜索框",
      duration: "1m 5s",
      device: "Desktop",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* 用户基本信息卡片 */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg">
                {userInfo?.userName?.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-2xl">{userInfo?.userName}</CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100</div>
              <div className="text-sm text-muted-foreground">总会话数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">99</div>
              <div className="text-sm text-muted-foreground">页面浏览量</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">66</div>
              <div className="text-sm text-muted-foreground">总事件数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">88</div>
              <div className="text-sm text-muted-foreground">平均会话时长</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="flex items-center gap-1">
                <Monitor className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Desktop</span>
              </div>
              <div className="text-sm text-muted-foreground">设备类型</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="flex items-center gap-1">
                <Globe className="h-5 w-5 text-indigo-600" />
                <span className="font-medium">Chrome</span>
              </div>
              <div className="text-sm text-muted-foreground">浏览器</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="flex items-center gap-1">
                <MapPin className="h-5 w-5 text-red-600" />
                <span className="font-medium">深圳</span>
              </div>
              <div className="text-sm text-muted-foreground">地理位置</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 分析内容标签页 */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="activity">活跃度分析</TabsTrigger>
          <TabsTrigger value="events">事件统计</TabsTrigger>
          <TabsTrigger value="path">路径分析</TabsTrigger>
          <TabsTrigger value="behavior">行为记录</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <UserActivityChart />
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <UserEventStats />
        </TabsContent>

        <TabsContent value="path" className="space-y-4">
          <UserPathAnalysis />
        </TabsContent>

        <TabsContent value="behavior" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="h-5 w-5" />
                用户行为记录
              </CardTitle>
              <CardDescription>
                详细记录用户在系统中的各项操作行为
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={behaviorData}
                pagination={pagination}
                setPagination={setPagination}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserBehaviorAnalysis;
