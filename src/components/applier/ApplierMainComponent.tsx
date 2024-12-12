import img from '../../assets/img/background/img.png';
import logo from '../../assets/img/background/logo.png';

function ApplierMainComponent() {
    return (
        <div className="h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white flex items-center justify-between px-6 py-6">
                <div className="flex items-center space-x-4">
                    {/* Logo 이미지 */}
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-36 h-12 "
                    />
                    <h1 className="text-black text-2xl font-semibold">BLAA</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow relative w-full">
                {/* 이미지 영역 */}
                <img
                    src={img}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* 등록하기 버튼 */}
                <button
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-12 py-4 text-lg rounded hover:bg-blue-700"
                >
                    등록하기
                </button>
            </main>

            {/* Footer */}
            <footer className="bg-white text-black text-center py-4">
                Footer
            </footer>
        </div>
    );
}

export default ApplierMainComponent;
