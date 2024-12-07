import React from 'react';
import AsideMenuComponent from "../components/common/AsideMenuComponent.tsx";
import useSignin from "../hooks/useSignin.ts";
import {useNavigate} from "react-router-dom";


function BasicLayout({children}: { children: React.ReactNode }) {

    const {doSignout} = useSignin();
    const navigate = useNavigate();

    const handleClickSignout = () => {
        doSignout()
        navigate({pathname: "/login"})
    }

    return (
        <div className={`flex h-screen bg-gray-50 max-w-[120rem] m-auto`}>
            {/* Desktop sidebar */}
            <AsideMenuComponent></AsideMenuComponent>

            <div className="flex flex-col flex-1 w-full">
                <header className="z-10 py-4 bg-side-navy">
                    <div className="w-full flex justify-end px-6">
                        <button
                            onClick={handleClickSignout}
                            className="px-6 py-2 text-white rounded-full bg-neutral-700 hover:bg-neutral-500 focus:outline-none hover:text-black focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors duration-300">
                            Logout
                        </button>
                    </div>
                </header>

                <main className="h-full overflow-y-auto">
                    <div className="container px-2 mx-auto grid m-1">
                        {children}
                    </div>
                </main>
            </div>
        </div>

    );
}

export default BasicLayout;