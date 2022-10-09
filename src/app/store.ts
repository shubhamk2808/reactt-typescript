import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userRedcers } from '../redux/reducer/users';

export const store = configureStore({
  reducer: {
    userRedcers,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
