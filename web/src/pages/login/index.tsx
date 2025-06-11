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
    <div className="w-full max-w-sm mx-auto mt-20 p-6 border rounded-lg shadow">
      <Tabs
        defaultValue="login"
        className="w-full"
        value={tab}
        onValueChange={setTab}
      >
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="login">登录</TabsTrigger>
          <TabsTrigger value="register">注册</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginForm onSuccess={handleLoginSuccess} />
        </TabsContent>

        <TabsContent value="register">
          <RegisterForm onSuccess={() => setTab("login")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
