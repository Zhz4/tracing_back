import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState("login");

  const handleLoginSuccess = () => {
    const redirect = searchParams.get("redirect") || "/home";
    navigate(redirect);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* 简洁的标题区域 */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              {tab === "login" ? "登录账户" : "创建账户"}
            </h1>
            <p className="text-gray-600 mt-2 text-sm">
              {tab === "login"
                ? "欢迎回来，请登录您的账户"
                : "填写信息创建新账户"}
            </p>
          </div>

          <Tabs
            defaultValue="login"
            className="w-full"
            value={tab}
            onValueChange={setTab}
          >
            <TabsList className="grid grid-cols-2 w-full mb-6">
              <TabsTrigger value="login" className="text-sm">
                登录
              </TabsTrigger>
              <TabsTrigger value="register" className="text-sm">
                注册
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-0">
              <LoginForm onSuccess={handleLoginSuccess} />
            </TabsContent>

            <TabsContent value="register" className="mt-0">
              <RegisterForm onSuccess={() => setTab("login")} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
