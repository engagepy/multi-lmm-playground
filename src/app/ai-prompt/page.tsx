// default library
import * as React from 'react';

import dynamic from 'next/dynamic';

const SearchSection = dynamic(() => import('@/components/Page/AiPromptPage/SearchSection'), { ssr: true });
const SelectedModels = dynamic(() => import('@/components/Page/AiPromptPage/SelectedModels'), { ssr: true });

const AiPrompt = () => {
  return (
    <div className="flex-1 w-full h-auto flex item-center justify-center bg-white dark:bg-[#141313] shadow-lg rounded-3xl ml-6 overflow-auto ">
      <div className='w-full max-w-full p-8 pb-3 overflow-y-scroll no-scrollbar'>
        {/*  */}
        <SearchSection />

        {/*  */}
        <SelectedModels />

      </div>
    </div>
  )
}

export default AiPrompt