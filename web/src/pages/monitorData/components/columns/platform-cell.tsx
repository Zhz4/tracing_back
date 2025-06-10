import { Monitor, Smartphone } from "lucide-react";

// 平台图标映射 - 使用设计系统颜色
const PlatformIcons = {
  Windows: <Monitor className="w-4 h-4 text-chart-2" />,
  MacOS: <Monitor className="w-4 h-4 text-muted-foreground" />,
  Linux: <Monitor className="w-4 h-4 text-chart-5" />,
  iOS: <Smartphone className="w-4 h-4 text-muted-foreground" />,
  Android: <Smartphone className="w-4 h-4 text-chart-4" />,
} as const;

const getPlatformIcon = (platform: string) => {
  const normalizedPlatform = platform?.toLowerCase();
  if (normalizedPlatform?.includes("windows")) return PlatformIcons.Windows;
  if (normalizedPlatform?.includes("mac")) return PlatformIcons.MacOS;
  if (normalizedPlatform?.includes("linux")) return PlatformIcons.Linux;
  if (normalizedPlatform?.includes("ios")) return PlatformIcons.iOS;
  if (normalizedPlatform?.includes("android")) return PlatformIcons.Android;
  return <Monitor className="w-4 h-4 text-muted-foreground" />;
};

interface PlatformCellProps {
  platform?: string;
}

export const PlatformCell = ({ platform }: PlatformCellProps) => {
  return (
    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
      {getPlatformIcon(platform || "")}
      <span className="text-sm text-foreground">{platform || "未知平台"}</span>
    </div>
  );
};
