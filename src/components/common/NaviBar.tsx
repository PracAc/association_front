

function NaviBar() {
    return (
        <div className="min-h-screen flex flex-col">


            {/* 메인 컨텐츠 */}
            <main className="flex-grow container mx-auto px-4 py-6">
                <section className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">환영합니다!</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        사단법인 한국안전보건협회의 관리 시스템에 오신 것을 환영합니다.
                    </p>
                </section>

                {/* 주요 기능 소개 */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 bg-white shadow rounded-lg text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">공지사항</h2>
                        <p className="text-gray-600 mb-4">
                            최신 공지사항을 확인하세요.
                        </p>
                        <button
                            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-4 py-2 rounded-full transition"
                        >
                            확인하기
                        </button>
                    </div>

                    <div className="p-6 bg-white shadow rounded-lg text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">협회등록</h2>
                        <p className="text-gray-600 mb-4">
                            협회 정보를 등록하거나 수정하세요.
                        </p>
                        <button
                            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-4 py-2 rounded-full transition"
                        >
                            등록하기
                        </button>
                    </div>

                    <div className="p-6 bg-white shadow rounded-lg text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">교육자료</h2>
                        <p className="text-gray-600 mb-4">
                            최신 교육자료를 다운로드하세요.
                        </p>
                        <button
                            onClick={() => window.location.href = "/education-materials"}
                            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-4 py-2 rounded-full transition"
                        >
                            자료 보기
                        </button>
                    </div>
                </section>
            </main>


        </div>
    );
}

export default NaviBar;
