import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import rootReducer from "./rootReducer";
import { initialState as asyncDataInitialState } from "./asyncData/slice";

const initialState = {
  asyncData: asyncDataInitialState,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type ThunkType<R = void> = ThunkAction<R, RootState, unknown, Action>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
