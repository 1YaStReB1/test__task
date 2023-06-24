import React, { useEffect, useState } from "react";
import { IEvent } from "../../types/Event.type";


import '../../assets/styles/rect.scss'

interface IRectProps {
  event: IEvent;
}

const Rect = ({ event }: IRectProps) => {
  
  const rectStyle: React.CSSProperties = {
    left: `${event.zone.left}px`,
    top: `${event.zone.top}px`,
    width: `${event.zone.width}px`,
    height: `${event.zone.height}px`,
  };
  return <div key={event.timestamp} style={rectStyle} className="rect" />;
};

export default Rect;
