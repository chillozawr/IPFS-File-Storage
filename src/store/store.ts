import { configureStore } from "@reduxjs/toolkit";
import { addressReducer } from "../store/addressSlice/addressSlice";

const store = configureStore({
  reducer: {
    address: addressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["address/setNodeIPFS"],
        ignoredActionPaths: ["payload.IPFSNode"],
        ingoredPaths: ["address.IPFSNode"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
