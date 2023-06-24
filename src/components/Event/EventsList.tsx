
import React from "react";
import type Player from "video.js/dist/types/player";
import Event from "./Event";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTime } from "../../store/videoSlice";
import { IEvent } from "../../types/Event.type";
import { RootState } from "../../store/store";
import "../../assets/styles/event.scss";


interface IEventProps {
  player: Player | null;
}

const EventsList = ({ player }: IEventProps) => {
  const events = useSelector((state: RootState) => state.events.events);
  const dispatch = useDispatch();

 

  const seekToEvent = (event: IEvent) => {
    if (player) {
      const timestamp = event.timestamp / 1000; // Convert milliseconds to seconds
      player.currentTime(timestamp);
      dispatch(setCurrentTime(timestamp));
    }
  };

  const handleSubmit = (event: IEvent) => {
    seekToEvent(event);
  };

  return (
    <div className="event__list">
      {[...events]
        .sort((a, b) => a.timestamp - b.timestamp)
        .map((event: IEvent) => {
          return (
            <Event
              key={event.timestamp}
              event={event}
              onClick={() => handleSubmit(event)}
            />
          );
        })}
    </div>
  );
};

export default React.memo(EventsList);
