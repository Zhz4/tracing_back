import dayjs from "dayjs";
import { cn } from "@/lib/utils";

interface SendTimeCellProps {
  sendTime?: string | number;
}

export const SendTimeCell = ({ sendTime }: SendTimeCellProps) => {
  const formattedSendTime = sendTime
    ? dayjs(Number(sendTime)).format("YYYY-MM-DD HH:mm:ss")
    : "-";
  const isRecent =
    sendTime && dayjs().diff(dayjs(Number(sendTime)), "hour") < 1;

  return (
    <div
      className={cn(
        "font-mono px-2 py-1 rounded-md transition-colors",
        isRecent
          ? "bg-chart-4/10 text-chart-4 border border-chart-4/20"
          : "bg-muted text-muted-foreground"
      )}
    >
      {formattedSendTime}
      {isRecent && (
        <div className="flex items-center gap-1 mt-1">
          <div className="w-2 h-2 bg-chart-4 rounded-full animate-pulse"></div>
          <span className="text-xs text-chart-4">最近</span>
        </div>
      )}
    </div>
  );
};
