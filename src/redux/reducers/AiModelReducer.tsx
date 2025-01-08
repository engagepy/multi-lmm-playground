import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import { AiModelList } from '@/interface/models';
import { allAiModel } from '@/data/aiModelData';

type InitialState = AiModelList;



const initialState: InitialState = [];

const aiModelSlice = createSlice({
    name: 'aiModel',
    initialState,
    reducers: {
        addAiModel: (state: InitialState, action: PayloadAction<number>): InitialState => {
            const updatedList = [
                ...state,
                ...(allAiModel.filter(e => e.id === action.payload)),
            ];

            return updatedList.sort((a, b) => a.id - b.id);
        },
        removeAiModel: (state: InitialState, action: PayloadAction<number>): InitialState => {
            const index = action.payload;
            return [...state].splice(index, 1);
        },
        addAllAiModel: (): InitialState => {
            return [...allAiModel];
        },
        removeAllAiModel: (): InitialState => {
            return [];
        }
    },
});

export const { addAiModel, removeAiModel, addAllAiModel, removeAllAiModel } = aiModelSlice.actions;

export default aiModelSlice.reducer;

export const getAiModels = (state: RootState) => state.aiModel;
