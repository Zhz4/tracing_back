import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AuthRoute = ({ children }: Props) => {
  const location = useLocation();
  const token = localStorage.getItem("access_token");

  if (!token) {
    // 未登录，跳转到 login，并带上来源地址
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  return children;
};

export default AuthRoute;
