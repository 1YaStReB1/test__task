import { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import EventsList from "../Event/EventsList";
import { VideoJsPlayerOptions } from "../../types/Video.type";
import Rect from "../Rect/Rect";
import { IEvent } from "../../types/Event.type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchEvents } from "../../store/eventSlice";

import "../../assets/styles/video.scss";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [reachedTimecodes, setReachedTimecodes] = useState<IEvent[]>([]);
  const [player, setPlayer] = useState<Player | null>(null);

  const events = useSelector((state: RootState) => state.events.events);
  const error = useSelector((state: RootState) => state.events.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  useEffect(() => {
    if (error) {
      console.error("Ошибка при получении событий:", error);
    }
  }, [error]);

  useEffect(() => {
    const videoElement = videoRef.current;
    let playerInstance: Player;

    if (videoElement) {
      const playerOptions: VideoJsPlayerOptions = {
        autoplay: false,
        controls: true,
        sources: [
          {
            src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            type: "video/mp4",
          },
        ],
      };

      playerInstance = videojs(videoElement, playerOptions, () => {
        setPlayer(playerInstance);
      });

      playerInstance.src({
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        type: "video/mp4",
      });
    }

    return () => {
      if (player) {
        player.dispose();
        setPlayer(null);
      }
    };
  }, []);

  useEffect(() => {
    videoRef.current?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [player, events]);

  const handleTimeUpdate = () => {
    if (player) {
      const currentTime = player.currentTime();

      const reachedTimecodeIds = events.filter((timecode) => {
        const { timestamp, duration } = timecode;
        const endTime = timestamp + duration;
        return currentTime >= timestamp / 1000 && currentTime <= endTime / 1000;
      });

      setReachedTimecodes(reachedTimecodeIds);
    }
  };

  return (
    <>
    <h1 className="title">Тестовое задание</h1>
      <div className="video">
        <div data-vjs-player>
          <video
            ref={videoRef}
            width={1300}
            height={750}
            id="my-video"
            className="video-js"
          />
          {reachedTimecodes.map((event) => (
            <Rect key={event.id} event={event} />
          ))}
        </div>

        <EventsList player={player} />
      </div>
    </>
  );
};

export default Video;
