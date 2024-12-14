import video from  "../../assets/video/vider.mp4"

function ApplierMainComponent() {
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
                    <source src={video}/>
                    Your browser does not support the video tag.
                </video>

                {/* 텍스트 영역 */}
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold text-center">
                    자신만에 특별한 작품을 인증받아보세요
                </div>

                {/* 등록하기 버튼 */}
                <button
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-16 py-6 text-xl rounded hover:bg-blue-700"
                >
                    등록하기
                </button>
            </main>
        </div>
    );
}

export default ApplierMainComponent;
