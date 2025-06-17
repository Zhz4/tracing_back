import { Monitor, Smartphone, Tablet } from "lucide-react";

// 平台图标映射 - 使用设计系统颜色
const PlatformIcons = {
  pc: <Monitor className="w-4 h-4 text-chart-2" />,
  phone: <Smartphone className="w-4 h-4 text-chart-2" />,
  tablet: <Tablet className="w-4 h-4 text-chart-2" />,
} as const;

const getPlatformInfo = (platform: string) => {
  const p = platform?.toLowerCase() || "";
  if (p.includes("win")) return { icon: PlatformIcons.pc, name: "Windows" };
  if (p.includes("mac") || p.includes("intel")) return { icon: PlatformIcons.pc, name: "MacOS" };
  if (p.includes("ipad")) return { icon: PlatformIcons.tablet, name: "iPad" };
  if (p.includes("iphone") || p.includes("ios")) return { icon: PlatformIcons.phone, name: "iPhone" };
  if (p.includes("linux") || p.includes("android")) return { icon: PlatformIcons.phone, name: "安卓" };
  
  return { icon: PlatformIcons.pc, name: "未知平台" };
};

interface PlatformCellProps {
  platform?: string;
}

export const PlatformCell = ({ platform }: PlatformCellProps) => {
  const { icon, name } = getPlatformInfo(platform || "");
  
  return (
    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
      {icon}
      <span className="text-sm text-foreground">{name}</span>
    </div>
  );
};
