import {configureStore} from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});
type AppState = ReturnType<typeof store.getState>;
type AddDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AddDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
