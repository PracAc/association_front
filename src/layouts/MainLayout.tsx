import React from 'react';

import NaviBar from "../components/common/NaviBar.tsx";


function BasicLayout({children}: { children: React.ReactNode }) {

    // const {doSignout} = useSignin();
    // const navigate = useNavigate();

    return (
        <>
            <NaviBar/>
            <div className={`flex h-screen bg-gray-50 max-w-[120rem] m-auto`}>
                {/* Desktop sidebar */}
                {/*<AsideMenuComponent></AsideMenuComponent>*/}

                <div className="flex flex-col flex-1 w-full">
                    <main className="h-full overflow-y-auto">
                        <div className="container px-2 mx-auto grid m-1">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default BasicLayout;