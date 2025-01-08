'use client';
import * as AiModelReducer from '@/redux/reducers/AiModelReducer';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectAllSection from './SelectAllSection';
import { allAiModel } from '@/data/aiModelData';
import ModelListSection from './ModelListSection';

const Sidebar: React.FC = () => {

    const dispatch = useDispatch();
    const aiModal = useSelector(AiModelReducer.getAiModels);

    const isAllSelected = allAiModel.length === aiModal.length;


    const onHandleClick = (id: number): void => {
        if (!isAllSelected) {
            const isExist = aiModal.some(e => e.id === id);

            if (isExist) {
                dispatch(AiModelReducer.removeAiModel(id));
            } else {
                dispatch(AiModelReducer.addAiModel(id));
            }
        } else {
            dispatch(AiModelReducer.removeAllAiModel());
            dispatch(AiModelReducer.addAiModel(id));
        }

    }

    const onHandleSelectedAll = (): void => {
        if (!isAllSelected) {
            dispatch(AiModelReducer.addAllAiModel());
        } else {
            dispatch(AiModelReducer.removeAllAiModel());
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