import { createSlice } from "@reduxjs/toolkit";
import type Player from "video.js/dist/types/player";

interface IVideoState {
  currentTime: number;
  player: Player | null;
}

const initialState: IVideoState = {
  currentTime: 0,
  player: null,
};

export const videoSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    setPlayer(state, action) {
      state.player = action.payload;
    },
  },
});

export const { setCurrentTime, setPlayer } = videoSlice.actions;

export default videoSlice.reducer;
