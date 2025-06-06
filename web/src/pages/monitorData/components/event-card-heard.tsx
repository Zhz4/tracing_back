import { CardHeader, CardTitle } from "@/components/ui/card";
import { EventIdEnum, EventTypeEnum } from "@/constants";
import { cn } from "@/lib/utils";
import { getEventName } from "@/utils/checkEventAll";

interface EventCardHeardProps {
  eventType: string;
  eventId: string;
  icon: React.ReactNode;
  textColor: string;
  bgColor: string;
}

const EventCardHeard = ({
  eventType,
  eventId,
  icon,
  textColor,
  bgColor,
}: EventCardHeardProps) => {
  return (
    <CardHeader className="pb-3">
      <CardTitle className={cn("flex items-center gap-2", textColor)}>
        {icon}
        {getEventName(
          eventType as `${EventTypeEnum}`,
          eventId as `${EventIdEnum}`
        )}
        <span
          className={cn(
            "ml-auto text-xs px-2 py-1 rounded",
            bgColor,
            textColor
          )}
        >
          {eventType} {eventId}
        </span>
      </CardTitle>
    </CardHeader>
  );
};

export default EventCardHeard;
