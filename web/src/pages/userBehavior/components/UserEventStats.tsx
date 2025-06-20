import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { MousePointer, Eye, Edit, Search, Download } from "lucide-react";
import { useEffect, useState } from "react";

const UserEventStats = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 延迟渲染图表，确保容器已经准备好
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 模拟事件统计数据
  const eventData = [
    { name: '页面访问', value: 1248 },
    { name: '按钮点击', value: 856 },
    { name: '表单提交', value: 234 },
    { name: '搜索操作', value: 189 },
    { name: '文件下载', value: 67 },
  ];

  const chartConfig = {
    pageViews: {
      label: "页面访问",
      color: "hsl(var(--chart-1))",
    },
    buttonClicks: {
      label: "按钮点击", 
      color: "hsl(var(--chart-2))",
    },
    formSubmissions: {
      label: "表单提交",
      color: "hsl(var(--chart-3))",
    },
    searches: {
      label: "搜索操作", 
      color: "hsl(var(--chart-4))",
    },
    downloads: {
      label: "文件下载",
      color: "hsl(var(--chart-5))",
    },
  };

  const getEventIcon = (eventName: string) => {
    switch (eventName) {
      case '页面访问':
        return <Eye className="h-4 w-4" />;
      case '按钮点击':
        return <MousePointer className="h-4 w-4" />;
      case '表单提交':
        return <Edit className="h-4 w-4" />;
      case '搜索操作':
        return <Search className="h-4 w-4" />;
      case '文件下载':
        return <Download className="h-4 w-4" />;
      default:
        return <MousePointer className="h-4 w-4" />;
    }
  };

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>事件类型分布</CardTitle>
          <CardDescription>
            用户各类操作事件的数量分布
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            {isVisible ? (
              <ChartContainer config={chartConfig} className="w-full h-full">
                <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <Pie
                    data={eventData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {eventData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted/10 rounded-lg">
                <div className="text-sm text-muted-foreground">加载图表中...</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>事件详细统计</CardTitle>
          <CardDescription>
            各类事件的具体数量和占比
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventData.map((event, index) => {
              const total = eventData.reduce((sum, item) => sum + item.value, 0);
              const percentage = ((event.value / total) * 100).toFixed(1);
              
              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getEventIcon(event.name)}
                    <span className="font-medium">{event.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{event.value}</div>
                    <div className="text-sm text-muted-foreground">{percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center font-semibold">
              <span>总事件数</span>
              <span>{eventData.reduce((sum, item) => sum + item.value, 0)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserEventStats; 