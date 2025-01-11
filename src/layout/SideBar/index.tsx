'use client';
import * as React from 'react';
// redux
import { useSelector, useDispatch } from 'react-redux';
import * as AiModelReducer from '@redux/reducers/AiModelReducer';
// all modal data
import { allAiModel } from '@config/aiModelData';
// custom section
import SelectAllSection from './SelectAllSection';
import ModelListSection from './ModelListSection';

const Sidebar: React.FC = () => {

    const dispatch = useDispatch();
    const aiModal = useSelector(AiModelReducer.getAiModels); //fetch the data form redux

    // check if all ai model is selected or not
    const isAllSelected = allAiModel.length === aiModal.length;

    // handle click event for ai model checkbox
    const onHandleClick = (id: number): void => {
        if (!isAllSelected) {
            // check the modal is selected or not
            const isExist = aiModal.some(e => e.id === id);

            if (isExist) {
                dispatch(AiModelReducer.removeAiModel(id)); // remove the selected modal
            } else {
                dispatch(AiModelReducer.addAiModel(id)); // add the selected modal
            }
        } else {
            dispatch(AiModelReducer.removeAllAiModel()); // remove all the selected modal
            dispatch(AiModelReducer.addAiModel(id)); // add the selected modal
        }

    }

    // handle click event for select all checkbox
    const onHandleSelectedAll = (): void => {
        if (!isAllSelected) {
            dispatch(AiModelReducer.addAllAiModel()); // add all selected modal
        } else {
            dispatch(AiModelReducer.removeAllAiModel()); // remove all selected modal
        }
    }

    return (
        <div className="space-y-4 overflow-y-scroll no-scrollbar">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Select AI Model</h3>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-[#141313] dark:border-gray-600 dark:text-white">
                {/* select all check-box */}
                <SelectAllSection isSelectedAll={isAllSelected} onHandleChange={onHandleSelectedAll} />

                <ModelListSection aiModal={aiModal} onHandleClick={onHandleClick} />
            </ul>
        </div>
    )
}

export default Sidebar