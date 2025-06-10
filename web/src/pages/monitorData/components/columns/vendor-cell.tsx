import { Globe } from "lucide-react";
import chromeIcon from "@/assets/icons/chrome.svg";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BrowserVendor = {
  "Google Inc.": { icon: chromeIcon, name: "Chrome", color: "text-chart-2" },
  "Mozilla Foundation": {
    icon: chromeIcon,
    name: "Firefox",
    color: "text-chart-5",
  },
  "Microsoft Corporation": {
    icon: chromeIcon,
    name: "Edge",
    color: "text-chart-2",
  },
  "Apple Inc.": {
    icon: chromeIcon,
    name: "Safari",
    color: "text-muted-foreground",
  },
  "Opera Software ASA": {
    icon: chromeIcon,
    name: "Opera",
    color: "text-destructive",
  },
} as const;

const findBrowserVendorIcon = (vendor: keyof typeof BrowserVendor) => {
  const browserInfo = BrowserVendor[vendor];
  if (!browserInfo) return <Globe className="w-4 h-4 text-muted-foreground" />;

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={cn(
            "flex items-center gap-1 p-1 rounded-md hover:bg-muted transition-colors",
            browserInfo.color
          )}
        >
          <img src={browserInfo.icon} alt={vendor} className="w-4 h-4" />
          <span className="text-xs font-medium">{browserInfo.name}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{vendor}</p>
      </TooltipContent>
    </Tooltip>
  );
};

interface VendorCellProps {
  vendor?: string;
}

export const VendorCell = ({ vendor }: VendorCellProps) => {
  return (
    <div className="flex items-center justify-start">
      {findBrowserVendorIcon(vendor as keyof typeof BrowserVendor)}
    </div>
  );
};
