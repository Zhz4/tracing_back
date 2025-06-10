import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PageViewChartProps<T> {
  isLoading: boolean;
  pageData: Array<T>;
  title: string;
  description: string;
  label: string;
  labelKey: keyof T;
  valueKey: keyof T;
}
const PageViewChart = <T,>({
  isLoading,
  pageData,
  title,
  description,
  label,
  labelKey,
  valueKey,
}: PageViewChartProps<T>) => {
  const data = pageData?.map((item) => ({
    name: item[labelKey] as string,
    fullUrl: item[labelKey] as string,
    uv: item[valueKey] as number,
  }));

  const config = {
    uv: {
      label: label,
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
        <div className="w-full h-[300px]">
          <ChartContainer config={config} className="w-full h-full">
            <BarChart
              data={data}
              margin={{ top: 10, right: 5, left: 5, bottom: 5 }}
              barCategoryGap="10%"
            >
              <XAxis dataKey="name" tick={false} axisLine={false} height={0} />
              <YAxis
                tick={{ fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={25}
              />
              <ChartTooltip content={<CustomTooltip currentLabel={label} />} />
              <Bar
                dataKey="uv"
                fill="hsl(var(--primary))"
                radius={[2, 2, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
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
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4">{renderContent()}</CardContent>
    </Card>
  );
};

const CustomTooltip = ({
  active,
  payload,
  currentLabel,
}: {
  active?: boolean;
  payload?: Array<{ payload: { fullUrl: string }; value: number }>;
  currentLabel: string;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3 text-sm max-w-[300px] min-w-[200px]">
        <p className="font-medium break-all whitespace-normal leading-tight mb-2">
          {data.fullUrl}
        </p>
        <p className="text-muted-foreground">
          {currentLabel}:
          <span className="font-medium text-foreground">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default PageViewChart;
