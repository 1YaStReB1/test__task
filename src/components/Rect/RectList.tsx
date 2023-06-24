import { IEvent } from "../../types/Event.type";
import Rect from "./Rect";

interface IRectListProps {
  events: IEvent[];
}

const RectList = ({ events }: IRectListProps) => {
  console.log("Render List");
  return (
    <>
      {events.map((event: IEvent) => {
        return <Rect key={event.timestamp} event={event} />;
      })}
    </>
  );
};

export default RectList;
