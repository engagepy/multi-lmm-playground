import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import persistedReducer, { rootReducer } from '@redux/reducers';

// Configure store with persisted state
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, }),
    devTools: true,
});

// Create persisted store
export const persistedStore = persistStore(store);

// Store setup for tests with optional preloaded state
export function setupStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,

        // Preload the store with the specified initial state (useful for testing)
        preloadedState,
    })
}

// TypeScript types for state and store
export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type AppDispatchTest = AppStore['dispatch'];
