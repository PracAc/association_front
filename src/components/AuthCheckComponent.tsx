import {useState} from "react";
import LoadingComponent from "./common/LoadingComponent.tsx";
import {useParams} from "react-router-dom";
import {checkApplierAuth} from "../apis/applierAPI.ts";

function AuthCheckComponent() {
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
                // setEmail("");
                // setAuthCode("");
            })
            .catch(() => {
                setModalMessage("오류로 인해 처리가 되지않았습니다.\n다시 시도해주시길 바랍니다.");
                setIsModalOpen(true);
                setLoading(false);
            })
    };

    return (
        <div className="flex w-full  min-h-screen bg-gray-100">


            {/* 중간 영역 */}
            <div className="w-1/2 max-w-full bg-white pt-5 pb-5 mx-auto  shadow-md">
                {/* 로딩 상태 */}
                {loading && (
                    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <LoadingComponent/>
                    </div>
                )}

                <div className="px-36 space-y-2">
                    {/* 이메일 입력 */}
                    <div className="flex flex-col mb-4 mt-40">
                        <label className="text-gray-700 font-semibold">이메일 주소</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일을 입력하세요"
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* 인증 코드 입력 */}
                    <div className="flex flex-col mb-4">
                        <label className="text-gray-700 font-semibold">인증 코드</label>
                        <input
                            type="text"
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                            placeholder="인증 코드를 입력하세요"
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* 이메일 인증 코드 전송 버튼 */}
                    <div className="flex justify-between gap-4">
                        <button
                            onClick={handleVerifyCode}
                            disabled={loading || !authCode}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
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

export default AuthCheckComponent;
