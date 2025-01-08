// default library
"use client"
import { getAiModels } from '@/redux/reducers/AiModelReducer';
import { getAiPrompt } from '@/redux/reducers/AiPromptReducer';
import * as React from 'react';
import { useSelector } from 'react-redux';
import ResponseSection from './ResponseSection';

const SelectedModels: React.FC = () => {
    const aiModal = useSelector(getAiModels);
    const aiPrompt = useSelector(getAiPrompt);

    return (
        <div className="grid grid-cols-2 gap-4 mt-4">
            {aiModal.map((ele,) => (
                <ResponseSection
                    aiModal={ele}
                    prompt={aiPrompt.prompt}
                    key={ele.id}
                />
            ))}
        </div>
    )
}

export default SelectedModels