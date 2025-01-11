import { combineReducers } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AiPromptReducer from './AiPromptReducer';
import AiModelReducer from './AiModelReducer';
import AuthReducer from './AuthReducer';

// Combine reducers into a single root reducer
export const rootReducer = combineReducers({
    aiPrompt: AiPromptReducer,
    aiModel: AiModelReducer,
    auth: AuthReducer,
});

// Configuration for Redux Persist, specifying storage type and key
const persistConfig = {
    key: 'ai-playground',
    storage,
};

// Wrap the rootReducer with persistReducer to enable state persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
