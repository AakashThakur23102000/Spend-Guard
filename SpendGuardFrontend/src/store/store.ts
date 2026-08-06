import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import themeReducer from "./themeSlice";
import walkthroughReducer from "./walkthrough";

import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
const persistConfig = {
    storage: AsyncStorage,
}
const rootReducer = combineReducers({
    theme: persistReducer({ ...persistConfig, key: "theme" }, themeReducer),
    walkthrough: persistReducer({ ...persistConfig, key: "walkthrough" }, walkthroughReducer)
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch