// default library
import * as React from 'react';
import { NextPage } from 'next';

import SearchSection from '@components/Page/AiPromptPage/SearchSection';
import SelectedModels from '@components/Page/AiPromptPage/SelectedModels';

const AiPrompt: NextPage = () => {
  return (
    <div className="flex-1 w-full h-auto flex item-center justify-center bg-white dark:bg-[#141313] shadow-lg rounded-3xl ml-6 overflow-auto ">
      <div className='w-full max-w-full p-8 pb-3 overflow-y-scroll no-scrollbar'>
        {/* search prompt */}
        <SearchSection />

        {/* list of modal */}
        <SelectedModels />

      </div>
    </div>
  )
}

export default AiPrompt