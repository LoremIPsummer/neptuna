import { configureStore, ThunkAction, Action, Reducer } from "@reduxjs/toolkit";
import { connectRouter, RouterState } from "connected-react-router";
import { useDispatch } from "react-redux";
import userApiReducer from "./features/userApi";
import messageApiReducer from "./features/messageApi";
import subjectApiReducer from "./features/subjectApi";
import errorApiReducer from "./features/errorApi";
import loadApiReducer from "./features/loadApi";
import { createBrowserHistory, LocationState } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

export const store = configureStore({
  reducer: {
    users: userApiReducer,
    error: errorApiReducer,
    load: loadApiReducer,
    messages: messageApiReducer,
    subjects: subjectApiReducer,
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
