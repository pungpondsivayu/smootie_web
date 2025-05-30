import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { BaseApi } from "../../helper/controller/ConfigQuery";
import storage from "redux-persist/lib/storage";
import { authReducer } from "../slice/auth.slice";

// Persist configuration for auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"],
};

// Create persisted reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [BaseApi.reducerPath]: BaseApi.reducer,
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck : {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(BaseApi.middleware),
});

// Create persistor
export const persistor = persistStore(store);

// Share Get State
export type RootState = ReturnType<typeof store.getState>;
// Share Dispatch Get Action
export type AppDispatch = typeof store.dispatch;

// The selector for getting user state
export const selectUser = (state: RootState) => state.auth;

// สร้าง transform กรอง token ออกก่อน save



