// default library
import { NextPage } from 'next';
import * as React from 'react';

// search page
import SearchSection from '@components/Page/HomePage/SearchSection';

const Home: NextPage = () => {
  return (
    <>
      <div className="flex-1 w-full h-auto flex items-center justify-center bg-white dark:bg-[#141313] shadow-lg rounded-3xl ml-6">
        <div className='w-full max-w-lg p-8 '>
          <h2 className="text-2xl font-medium text-center mb-4">What would you want to know</h2>
          <SearchSection />
        </div>
      </div>
    </>
  )
}

export default Home