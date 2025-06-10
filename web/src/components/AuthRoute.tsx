import { Navigate, useLocation } from "react-router-dom";
import { getUserToken } from "@/utils/storage/userToken";

interface Props {
  children: React.ReactNode;
}

const AuthRoute = ({ children }: Props) => {
  const location = useLocation();
  const token = getUserToken();

  if (!token) {
    // 未登录，跳转到 login，并带上来源地址
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  return children;
};

export default AuthRoute;
