import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEvent } from '../types/Event.type';
import { createAction } from '@reduxjs/toolkit';

export const fetchEvents = createAction('events/fetch');
export const setEvents = createAction<IEvent[]>('events/set');
export const setError = createAction<string>('events/setError');

interface EventsState {
  events: IEvent[];
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEventsSuccess: (state, action: PayloadAction<IEvent[]>) => {
      state.events = action.payload;
      state.error = null;
    },
    setErrorUnSuccess: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setEventsSuccess, setErrorUnSuccess } = eventsSlice.actions;

export default eventsSlice.reducer;