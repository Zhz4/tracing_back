import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, AlertCircle, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold">页面未找到</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">抱歉，您访问的页面不存在</p>
            <p className="text-sm text-muted-foreground">
              请检查网址是否正确，或返回首页
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="flex-1 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                返回
              </Button>
              <Button onClick={handleGoHome} className="flex-1 gap-2">
                <Home className="w-4 h-4" />
                首页
              </Button>
            </div>

            <Button
              onClick={handleRefresh}
              variant="ghost"
              className="w-full gap-2 text-muted-foreground"
            >
              <RotateCcw className="w-4 h-4" />
              刷新页面
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFoundPage;
