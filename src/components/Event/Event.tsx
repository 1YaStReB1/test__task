import { IEvent } from "../../types/Event.type";
import '../../assets/styles/event.scss'

interface IEventProps {
  event: IEvent;
  onClick: () => void;
}
export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
};

const Event = ({ event, onClick }: IEventProps) => {
  return (
    <button className="event" onClick={onClick}>
      {formatTimestamp(event.timestamp)}
    </button>
  );
};

export default Event;
