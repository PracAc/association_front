import UserHeaderComponent from "../components/common/user/UserHeaderComponent.tsx";
import UserMainFooterComponent from "../components/common/user/UserMainFooterComponent.tsx";
import video from "../assets/video/video.mp4";


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

                {/* 비디오에 텍스트 오버레이 추가 */}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                    {/* 텍스트와 배경 처리 */}
                    <div className="text-white text-center text-2xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-8 p-6 bg-gray-700 bg-opacity-30 rounded-md">
                        <p>자신만의 특별한 작품을</p>
                        <p>BLAA에서 인증받아보세요</p>
                    </div>
                </div>

                {children}
            </main>
            <UserMainFooterComponent/>
        </div>
    );
}

export default MainLayout;