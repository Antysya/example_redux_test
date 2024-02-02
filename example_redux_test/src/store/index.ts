import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import settingsReducer from "./settingsSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        settings: settingsReducer,
    },
});
type AppState = ReturnType<typeof store.getState>;
type AddDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AddDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
