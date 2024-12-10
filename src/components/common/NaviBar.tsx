import { useNavigate } from "react-router-dom";

function NavigationBar() {
    const navigate = useNavigate(); // useNavigate 훅 사용

    return (
        <header className="w-full bg-gray-800 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center">
                {/* 로고 */}
                <div className="flex items-center mr-10">
                    <img
                        src="/path-to-logo.png"
                        alt="로고"
                        className="h-10 w-10 mr-2"
                    />
                    <span className="text-xl font-bold">협회 관리자</span>
                </div>

                {/* 메뉴 */}
                <nav className="flex items-center space-x-6">
                    <a
                        href="#"
                        className="text-sm font-medium hover:text-yellow-300 transition"
                    >
                        신청관리
                    </a>
                    <a
                        href="#"
                        className="text-sm font-medium hover:text-yellow-300 transition"
                    >
                        등록하기
                    </a>
                </nav>

                {/* 로그인과 로그아웃 버튼 */}
                <div className="ml-auto flex items-center space-x-4">
                    <button
                        onClick={() => navigate("/login")} // 로그인 페이지로 이동
                        className="bg-yellow-500 hover:bg-yellow-400 text-gray-800 font-semibold px-4 py-2 rounded-full transition"
                    >
                        로그인
                    </button>
                    <button
                        className="bg-yellow-500 hover:bg-yellow-400 text-gray-800 font-semibold px-4 py-2 rounded-full transition"
                    >
                        로그 아웃
                    </button>
                </div>
            </div>
        </header>
    );
}

export default NavigationBar;
