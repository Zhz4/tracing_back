import { getPageData, getPageErrorData } from "@/api/analyze";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "./components/PageHeader";
import PageViewChart from "./components/PageViewChart";

const Home = () => {
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
      <div className="grid grid-cols-2 gap-6 mt-6">
        <PageViewChart
          isLoading={isLoading}
          pageData={pageData || []}
          title="页面访问统计"
          description="各页面的访问量分布情况"
          label="访问量"
          labelKey="url"
          valueKey="views"
        />
        <PageViewChart
          isLoading={pageErrorLoading}
          pageData={pageErrorData || []}
          title="页面错误统计"
          description="各页面的错误量分布情况"
          label="错误量"
          labelKey="appName"
          valueKey="errorCount"
        />
      </div>
    </div>
  );
};

export default Home;
