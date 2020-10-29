import { configureStore, ThunkAction, Action, Reducer } from "@reduxjs/toolkit";
import { connectRouter, push, RouterState } from "connected-react-router";
import { useDispatch } from "react-redux";
import userApiReducer from "./features/userApi";
import { createBrowserHistory, LocationState } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: {
    userApi: userApiReducer,
    router: (connectRouter(history) as any) as Reducer<
      RouterState<LocationState>
    >,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(routerMiddleware(history)),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
