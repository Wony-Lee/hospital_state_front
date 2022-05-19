import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import userSlice from "../reduces/userSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import modalSlice from "../reduces/modalSlice";


const rootReducer = combineReducers({
    user:userSlice.reducer,
    modal:modalSlice.reducer
})
const initialState = {};

const makeStore = () => configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat()
    }
})

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<any>(makeStore, { debug: false})

