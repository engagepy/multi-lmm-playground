import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import persistedReducer, { rootReducer } from '@/redux/reducers';

// configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }),
    devTools: true,
});

export const persistedStore = persistStore(store)

// configure store for test case
export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatchTest = AppStore['dispatch'];