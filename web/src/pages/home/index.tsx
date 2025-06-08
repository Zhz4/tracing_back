import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPageData } from "@/api/analyze";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "./components/PageHeader";
import PageViewChart from "./components/PageViewChart";

const Home = () => {
  const {
    data: pageData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pageData"],
    queryFn: getPageData,
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">加载失败</CardTitle>
            <CardDescription>无法获取页面数据，请稍后重试</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 space-y-6">
      <PageHeader />
      <PageViewChart isLoading={isLoading} pageData={pageData} />
    </div>
  );
};

export default Home;
