"use client"
import * as React from 'react';
import Link from 'next/link';
import Image from '@/commonElements/Image';
import Checkbox from '@/commonElements/Checkbox';

const Header = () => {
    const [darkMode, setDarkMode] = React.useState(true);

    React.useEffect(() => {
        console.log("CHANGE MODE")

        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const changeThemeMode = (): void => {
        setDarkMode(!darkMode)
    }

    return (
        <div className="flex justify-between mb-6">
            <Link href='/' className='flex items-center'>
                <Image
                    src='/mainlogo.png'
                    alt={'Logo'}
                    attrBtn={{
                        width: 70,
                        height: 70,
                        priority: true,
                    }}
                />
                <h4 className="text-lg font-bold">AI Playground</h4>
            </Link>
            <div className="flex items-center ">
                <label className="swap swap-rotate">
                    <Checkbox
                        attrBtn={{
                            className: "theme-controller",
                            value: "light",
                            onClick: changeThemeMode,
                        }}

                    />

                    <span className='swap-off '>🌙</span>
                    <span className='swap-on'>☀️</span>

                </label>
            </div>
        </div >
    )
}

export default Header