import UserHeaderComponent from "../components/common/user/UserHeaderComponent.tsx";
import UserMainFooterComponent from "../components/common/user/UserMainFooterComponent.tsx";
import video from "../assets/video/video_text.mp4";


function MainLayout({children}: { children: React.ReactNode }) {

    return (
        <div>
            <UserHeaderComponent/>
            <main className="flex-grow relative w-full h-screen">
                {/* 이미지 영역 */}
                <video
                    className="inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                >
                    <source src={video}/>
                    Your browser does not support the video tag.
                </video>

                {children}
            </main>
            <UserMainFooterComponent/>
        </div>
    );
}

export default MainLayout;