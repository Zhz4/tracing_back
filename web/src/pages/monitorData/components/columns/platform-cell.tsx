import { Monitor, Smartphone } from "lucide-react";

// 平台图标映射 - 使用设计系统颜色
const PlatformIcons = {
  pc: <Monitor className="w-4 h-4 text-chart-2" />,
  phone: <Smartphone className="w-4 h-4 text-chart-2" />,
} as const;

const platformMap = {
  Win32: {
    icon: PlatformIcons.pc,
    name: "Windows",
  },
  "MacIntel": {
    icon: PlatformIcons.pc,
    name: "MacOS",
  },
  "Linux aarch64": {
    icon: PlatformIcons.phone,
    name: "安卓",
  },
  "iPhone": {
    icon: PlatformIcons.phone,
    name: "iPhone",
  },
};

const getPlatformInfo = (platform: string) => {
  return (
    platformMap[platform as keyof typeof platformMap] || {
      icon: PlatformIcons.pc,
      name: "未知平台",
    }
  );
};

interface PlatformCellProps {
  platform?: string;
}

export const PlatformCell = ({ platform }: PlatformCellProps) => {
  return (
    <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors">
      {getPlatformInfo(platform || "")?.icon}
      <span className="text-sm text-foreground">
        {getPlatformInfo(platform || "")?.name}
      </span>
    </div>
  );
};
