import dayjs from "dayjs";
import { cn } from "@/lib/utils";

interface SendTimeCellProps {
  sendTime?: string | number;
}

export const SendTimeCell = ({ sendTime }: SendTimeCellProps) => {
  const formattedSendTime = sendTime
    ? dayjs(Number(sendTime)).format("YYYY-MM-DD HH:mm:ss")
    : "-";

  return (
    <div
      className={cn(
        "font-mono px-2 py-1 rounded-md transition-colors",
        "bg-muted text-muted-foreground"
      )}
    >
      {formattedSendTime}
    </div>
  );
};
