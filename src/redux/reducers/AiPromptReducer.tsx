import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';


type InitialState = {
    prompt: string;
}

const initialState: InitialState = {
    prompt: '',
};

// Slice for managing AI prompt state
const aiPromptSlice = createSlice({
    name: 'aiPrompt', // Slice name
    initialState, // Initial state
    reducers: {
        // Action to update the prompt text
        updatePromptText: (_state: InitialState, action: PayloadAction<string>): InitialState => {
            // Set prompt to the new value
            return { prompt: action.payload };
        },
    },
});

// Export the actions for use in components
export const { updatePromptText } = aiPromptSlice.actions;

// Default export of the reducer
export default aiPromptSlice.reducer;

// Selector to get AI models from the state
export const getAiPrompt = (state: RootState) => state.aiPrompt;
