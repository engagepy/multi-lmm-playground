import { combineReducers } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import AiPromptReducer from './AiPromptReducer';
import AiModelReducer from './AiModelReducer';


export const rootReducer = combineReducers({
    aiPrompt: AiPromptReducer,
    aiModel: AiModelReducer,
});


const persistConfig = {
    key: 'ai-playground',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;