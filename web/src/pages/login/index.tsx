import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login, register } from "@/api/login";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState("login"); // 当前 tab 的值
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const res = await login({ email: form.email, password: form.password });
    if (res.code === 200) {
      localStorage.setItem("access_token", res.data.access_token);

      const redirect = searchParams.get("redirect") || "/home";
      navigate(redirect, { replace: true });
    }
  };

  const handleRegister = async () => {
    const res = await register(form);
    if (res.code === 200) {
      setTab("login");
      setForm((prev) => ({ ...prev, password: "" }));
    }
  };

  // 密码输入框
  const renderPasswordInput = () => (
    <div>
      <Label htmlFor="password">
        密码<span className="text-red-500">*</span>
      </Label>
      <div className="relative">
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleInputChange}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
    </div>
  );

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
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="email">
                邮箱<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
              />
            </div>
            {renderPasswordInput()}
            <Button className="w-full" onClick={handleLogin}>
              登录
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="register">
          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="username">
                用户名<span className="text-red-500">*</span>
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="email">
                邮箱<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleInputChange}
              />
            </div>
            {renderPasswordInput()}
            <Button className="w-full" onClick={handleRegister}>
              注册
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
