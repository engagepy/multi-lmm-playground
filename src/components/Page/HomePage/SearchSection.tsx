'use client'
import * as React from 'react';
import Link from 'next/link';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAiPrompt, updatePromptText } from '@redux/reducers/AiPromptReducer';

// custom component
import Image from '@commonElements/Image';
import Input from '@commonElements/Input';

const SearchSection: React.FC = () => {

    const dispatch = useDispatch();
    const aiPrompt = useSelector(getAiPrompt); //fetch the data from redux

    // function to handle input change
    const onHandleChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(updatePromptText(e.target.value));
    }

    return (
        <div className="relative">
            {/* Input box */}
            <Input
                attrBtn={{
                    type: "text",
                    placeholder: "Type Here...",
                    className: "w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-[#141313] focus:outline-none focus:ring-2 focus:ring-blue-500",
                    value: aiPrompt.prompt,
                    onChange: onHandleChangeText,
                }}
            />

            {/* search button and redirect to ai-prompt page */}
            <Link
                href={`/ai-prompt`}
                className="absolute right-0 top-0 bottom-0 px-2.5 py-2 btn btn-neutral rounded-full m-2 border-0 h-auto min-h-[50%] focus:ring-0"
            >
                <Image
                    src={'/sparkling-dark.svg'}
                    alt='sparkling'
                    attrBtn={{
                        width: 22,
                        height: 22,
                        className: 'sparkling-color',
                    }}
                />
            </Link>

        </div>
    )
}


export default SearchSection