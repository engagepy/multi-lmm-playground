import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';


type InitialState = {
    prompt: string;
}

const initialState: InitialState = {
    prompt: '',
};

const aiPromptSlice = createSlice({
    name: 'aiPrompt',
    initialState,
    reducers: {
        updatePromptText: (state, action: PayloadAction<string>) => {
            state.prompt = action.payload;
        },
    },
});

export const { updatePromptText } = aiPromptSlice.actions;

export default aiPromptSlice.reducer;

export const getAiPrompt = (state: RootState) => state.aiPrompt;
