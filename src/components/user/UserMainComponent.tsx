import video from "../../assets/video/vider.mp4";
import { Link } from "react-router-dom";

function UserMainComponent() {
    return (
        <div className="h-screen w-screen flex flex-col">
            {/* Main Content */}
            <main className="flex-grow relative w-full h-screen">
                {/* 이미지 영역 */}
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                >
                    <source src={video} />
                    Your browser does not support the video tag.
                </video>

                {/* 텍스트 영역 */}
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center px-6 sm:px-12 md:px-16"
                >
                    자신만의 특별한 작품을 인증받아보세요
                </div>

                {/* 등록하기 버튼 */}
                <Link
                    to="/register"
                    className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-8 py-4 text-lg sm:px-12 sm:py-6 sm:text-xl rounded hover:bg-blue-700 transition-colors duration-300"
                >
                    등록하기
                </Link>
            </main>
        </div>
    );
}

export default UserMainComponent;
