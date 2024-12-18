import {useState} from "react";
import LoadingComponent from "./common/LoadingComponent.tsx";
import {useParams} from "react-router-dom";
import {checkApplierAuth} from "../apis/applierAPI.ts";
import logo from "../assets/img/logo.png"

function EmailAuthCheckComponent() {
    const {ano} = useParams();
    // 이메일 입력 상태
    const [email, setEmail] = useState("");
    // 인증코드 입력 상태
    const [authCode, setAuthCode] = useState("");
    // 모달 오픈 상태
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 모달 메세지 상태
    const [modalMessage, setModalMessage] = useState("");
    // 로딩 상태
    const [loading, setLoading] = useState(false);

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };


    // 인증 코드 확인 (실제 인증 확인 로직은 API로 처리)
    const handleVerifyCode = () => {
        setLoading(true);
        checkApplierAuth(Number(ano), email, authCode)
            .then((resMsg) => {
                setTimeout(() => {
                    setModalMessage(resMsg);
                    setIsModalOpen(true);
                    setLoading(false);
                }, 200);
                // 추후 성공시만 초기화 되게 설정
                setEmail("");
                setAuthCode("");
            })
            .catch(() => {
                setModalMessage("오류로 인해 처리가 되지않았습니다.\n다시 시도해주시길 바랍니다.");
                setIsModalOpen(true);
                setLoading(false);
            })
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {loading &&
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <LoadingComponent/>
                </div>
            }
            <div className="max-w-3xl w-full p-8 bg-white rounded-xl border border-white">
                {/* 로딩 상태 */}
                {/* 헤더영역 */}
                <div className="flex justify-center items-center flex-col mb-8">
                    <img src={logo} alt="협회 이미지" className="w-[20rem] mb-4"/>
                    <span className="text-2xl font-semibold text-gray-800">등록 인증</span>
                </div>

                <div className="w-full px-8 md:px-20 space-y-6">
                    {/* 이메일 입력 */}
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-700 font-semibold text-lg">이메일 주소</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일을 입력하세요"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* 인증 코드 입력 */}
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-700 font-semibold text-lg">인증 코드</label>
                        <input
                            type="text"
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                            placeholder="인증 코드를 입력하세요"
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {/* 이메일 인증 코드 전송 버튼 */}
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleVerifyCode}
                            disabled={loading || !authCode}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
                        >
                            인증 코드 확인
                        </button>
                    </div>
                </div>

                {/* 모달 */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                            <p className="text-lg mb-4">{modalMessage}</p>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                            >
                                확인
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
}

export default EmailAuthCheckComponent;
