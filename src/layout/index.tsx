import Header from './Header';
import SideBar from './SideBar';
import Auth from './Auth';

type Props = Readonly<{
    children: React.ReactNode;
}>

const Layout = ({ children }: Props) => {
    return (
        <Auth >
            <Header />
            <div className='flex vh-minus-100 overflow-y-scroll no-scrollbar'>
                <SideBar />
                {children}
            </div>
        </Auth>
    )
}

export default Layout