import { EventError, EventRequest } from "@/types";

interface MycomponentProps {
    event: EventError | EventRequest
}
const Mycomponent = ({ event }: MycomponentProps) => {
    console.log(event)
  return (
    <div>
        {event.eventId}
        {event.sendTime}
    </div>
  )
}

export default Mycomponent