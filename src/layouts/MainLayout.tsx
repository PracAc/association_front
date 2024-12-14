import UserHeaderComponent from "../components/common/user/UserHeaderComponent.tsx";
import UserMainFooterComponent from "../components/common/user/UserMainFooterComponent.tsx";


function MainLayout({children}: { children: React.ReactNode }) {

    return (
        <div>
            <UserHeaderComponent/>
             {children}
            <UserMainFooterComponent/>
        </div>
    );
}

export default MainLayout;