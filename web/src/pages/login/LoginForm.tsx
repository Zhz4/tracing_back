import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/api/login";
import { setUserToken } from "@/utils/storage/userToken";
import { toast } from "sonner";
import { setUserInfo } from "@/utils/storage/userInfo";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("请输入正确的邮箱地址"),
  password: z.string().min(6, "密码至少为6位"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormData) => {
    const loadingId = toast.loading("登录中...");
    try {
      const res = await login(values);
      setUserToken(res.data.access_token);
      setUserInfo({
        username: res.data.username,
        email: res.data.email,
        avatar: res.data.avatar,
      });
      onSuccess();
      toast.success("登录成功", { id: loadingId });
    } finally {
      toast.dismiss(loadingId);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                邮箱
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  className="h-10"
                  placeholder="请输入邮箱地址"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                密码
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className="h-10 pr-10"
                    placeholder="请输入密码"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-10"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "登录中..." : "登录"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
