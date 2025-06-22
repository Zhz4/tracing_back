import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// dayjs 全局配置
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "dayjs/locale/zh-cn";

// 扩展 dayjs 插件
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.locale("zh-cn");

createRoot(document.getElementById("root")!).render(<App />);
