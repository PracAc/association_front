import MainHeaderComponent from "../components/common/MainHeaderComponent.tsx";
import MainFooterComponent from "../components/common/MainFooterComponent.tsx";


function MainLayout({children}: { children: React.ReactNode }) {

    return (
        <div>
            <MainHeaderComponent/>
             {children}
            <MainFooterComponent/>
        </div>
    );
}

export default MainLayout;