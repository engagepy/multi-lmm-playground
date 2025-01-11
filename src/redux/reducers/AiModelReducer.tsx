import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import { AiModelList } from '@/interface/models';
import { allAiModel } from '@/config/aiModelData';

type InitialState = AiModelList;

const initialState: InitialState = [];

// Slice for managing AI models state
const aiModelSlice = createSlice({
    name: 'aiModel', // Slice name
    initialState, // Initial state
    reducers: {
        // Add an AI model by its ID to the state
        addAiModel: (state: InitialState, action: PayloadAction<number>): InitialState => {
            const updatedList = [
                ...state,
                ...(allAiModel.filter(e => e.id === action.payload)),
            ];

            return updatedList.sort((a, b) => a.id - b.id); // Sort by ID after adding
        },

        // Remove an AI model by its index in the list
        removeAiModel: (state: InitialState, action: PayloadAction<number>): InitialState => {
            const index = action.payload;
            return [...state].splice(index, 1);
        },

        // Add all available AI models from the config
        addAllAiModel: (): InitialState => {
            return [...allAiModel];
        },

        // Remove all AI models from the state
        removeAllAiModel: (): InitialState => {
            return [];
        }
    },
});

// Export the actions for use in components
export const { addAiModel, removeAiModel, addAllAiModel, removeAllAiModel } = aiModelSlice.actions;

// Default export of the reducer
export default aiModelSlice.reducer;

// Selector to get AI models from the state
export const getAiModels = (state: RootState) => state.aiModel;
