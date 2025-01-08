// default library
import * as React from 'react';
import Header from './Header';
import SideBar from './SideBar';

type Props = Readonly<{
    children: React.ReactNode;
}>

const Layout = ({ children }: Props) => {
    return (
        <div className="controller mx-auto px-4  h-screen bg-gray-100 text-gray-900 dark:bg-[#1E1E1E] dark:text-white">
            <Header />
            <div className='flex vh-minus-100'>
                <SideBar />
                {children}
            </div>
        </div>
    )
}

export default Layout