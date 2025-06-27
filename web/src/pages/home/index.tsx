import { getPageData, getPageErrorData } from "@/api/analyze";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "./components/PageHeader";
import PageViewChart from "./components/PageViewChart";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Home = () => {
  const isMobile = useIsMobile();
  const { data: pageData, isLoading } = useQuery({
    queryKey: ["pageData"],
    queryFn: getPageData,
  });

  const { data: pageErrorData, isLoading: pageErrorLoading } = useQuery({
    queryKey: ["pageErrorData"],
    queryFn: getPageErrorData,
  });

  return (
    <div className="w-full h-full ">
      <PageHeader />
      <div
        className={cn(
          "grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6 mt-6",
          isMobile && "grid-cols-1"
        )}
      >
        <PageViewChart
          isLoading={isLoading}
          pageData={pageData || []}
          title="页面访问统计"
          description="各页面的访问量分布情况"
          label="访问量"
          labelKey="url"
          valueKey="views"
          chartColor="var(--chart-2)"
        />
        <PageViewChart
          isLoading={pageErrorLoading}
          pageData={pageErrorData || []}
          title="页面错误统计"
          description="各页面的错误量分布情况"
          label="错误量"
          labelKey="appName"
          valueKey="errorCount"
          chartColor="var(--chart-5)"
        />
      </div>
    </div>
  );
};

export default Home;
