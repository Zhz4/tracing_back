import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PageData {
  url: string;
  views: number;
}

interface PageViewChartProps {
  isLoading: boolean;
  pageData?: PageData[];
}

// 自定义 Tooltip 组件
const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: { fullUrl: string }; value: number }>;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3 text-sm max-w-[300px] min-w-[200px]">
        <p className="font-medium break-all whitespace-normal leading-tight mb-2">
          {data.fullUrl}
        </p>
        <p className="text-muted-foreground">
          访问量:
          <span className="font-medium text-foreground">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

// 主组件
const PageViewChart = ({ isLoading, pageData }: PageViewChartProps) => {
  const data = pageData?.map((item) => ({
    name: item.url,
    fullUrl: item.url,
    uv: item.views,
  }));

  const config = {
    uv: {
      label: "访问量",
      color: "hsl(var(--chart-1))",
    },
  };

  const renderContent = () => {
    // 加载状态
    if (isLoading) {
      return (
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      );
    }
    // 有数据时显示图表
    if (data && data.length > 0) {
      return (
        <div className="w-full h-[300px] overflow-hidden">
          <ChartContainer config={config} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 10, right: 5, left: 5, bottom: 5 }}
                barCategoryGap="10%"
              >
                <XAxis
                  dataKey="name"
                  tick={false}
                  axisLine={false}
                  height={0}
                />
                <YAxis
                  tick={{ fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={25}
                />
                <ChartTooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="uv"
                  fill="hsl(var(--primary))"
                  radius={[2, 2, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      );
    }
    // 空数据状态
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        <div className="text-center">
          <p className="text-base font-medium">暂无数据</p>
          <p className="text-sm">还没有页面访问数据</p>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-1/2 min-w-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">页面访问统计</CardTitle>
        <CardDescription className="text-sm">
          各页面的访问量分布情况
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">{renderContent()}</CardContent>
    </Card>
  );
};

export default PageViewChart;
