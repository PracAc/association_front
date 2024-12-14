import {useRef, useState} from 'react';
import {bizValidateChk} from "../apis/bizAPI.ts";
import {IBizChk, INoBizChk} from "../types/applier/biz.ts";
import {checkEmailAuth, registryApplier, sendEmailAuth} from "../apis/applierAPI.ts";
import LoadingComponent from "./common/LoadingComponent.tsx";

const initialBizChk: IBizChk = {
    b_no: "",
    p_nm: "",
    start_dt: "",
};

const initialNoBizChk: INoBizChk = {
    name: "",
    s_link: "",
};


function RegisterComponent() {

    const [loading, setLoading] = useState<boolean>(false);

    // 사업자 등록증 진위여부 타입 상태
    const [bizChk, setBizChk] = useState<IBizChk>(initialBizChk);

    // 일반 제작자 타입 상태
    const [noBizChk, setNoBizChk] = useState<INoBizChk>(initialNoBizChk);

    // 사업자 등록증 인증 여부 상태
    const [bizNoVerified, setBizNoVerified] = useState<boolean | null>(null);

    // 사업자 등록증 유무 상태
    const [hasBizNo, setHasBizNo] = useState(false);

    // 모달 상태
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    // 이메일 입력 상태
    const [userEmail, setUserEmail] = useState<string>("");
    // 이메일 인증코드 상태
    const [emailAuthCode, setEmailAuthCode] = useState<string>("");
    // 이메일 인증 상태
    const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
    // 휴대폰 번호 상태
    const [userPhone, setUserPhone] = useState<string>("")
    // 파일 입력 상태
    const filesRef = useRef<HTMLInputElement>(null)

    const [errors, setErrors] = useState({
        email: true,
        phoneNumber: true
    });

    // input 초기화 함수
    const initAll = () => {
        setBizChk(initialBizChk)
        setNoBizChk(initialNoBizChk)
        setUserEmail("")
        setEmailAuthCode("")
        setEmailVerified(null)
        setUserPhone("")
    }

    // 알림 모달 닫기
    const closeModal = () => {
        setLoading(false);
        setModalOpen(false);
        setModalMessage("");
        // 모달 닫을시 이동처리 (추후처리)
    };

    // 유효성 검사 함수
    const validateForm = () => {
        const newErrors = {...errors};

        newErrors.email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail);

        // 전화번호 유효성 검사 (예시: 010-1234-5678 또는 01012345678)
        newErrors.phoneNumber = /^01[0-9]{1}-?[0-9]{3,4}-?[0-9]{4}$/.test(userPhone);

        setErrors(newErrors);

        // 유효성 검사 결과가 모두 true 일 때만 true 반환
        return Object.values(newErrors).every(value => value);

    };

    // 사업자 등록증 인증 확인 버튼 클릭
    const handleBizNoVerify = () => {
        console.log(bizChk.b_no)
        console.log(bizChk.p_nm)
        console.log(bizChk.start_dt)
        bizValidateChk(bizChk)
            .then(response => {
                const firstItem = response.data[0];
                const bNo = firstItem.b_no;
                const valid = firstItem.valid;

                setBizNoVerified(valid === '01' && bNo !== null ? true : false);
            })
            .catch(error => {
                console.log(error);
                setBizNoVerified(false)
            });
    };

    // 이메일 인증코드 전송 함수
    const handleCLickSendEmail = () => {
        // 이메일 유효성 체크
        if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userEmail)) {
            setErrors({...errors, email: true});
            sendEmailAuth(userEmail)
                .then(resMsg => {
                    setModalMessage(resMsg)
                    setModalOpen(true);
                })
            setEmailVerified(false)
        }
    }
    // 이메일 인증확인 함수
    const handleCLickCheckEmail = () => {
        checkEmailAuth(userEmail, emailAuthCode)
            .then(resBoolean => {
                if (resBoolean) {
                    setModalMessage("이메일이 인증 되었습니다.")
                    setModalOpen(true);
                    setEmailVerified(resBoolean)
                }
                if (!resBoolean) {
                    setModalMessage("이메일 인증이 실패했습니다 \n 확인후 다시 시도해주시길 바랍니다.")
                    setModalOpen(true);
                    setEmailVerified(resBoolean)
                }
            })
    }

    // 제출 버튼 클릭 함수
    const handleClickSubmit = () => {
        setLoading(true);
        // 사업자등록번호 있을 경우 확인
        if (hasBizNo) {
            if (!bizNoVerified) {
                setModalMessage("사업자 인증을 해주시길 바랍니다.")
                setModalOpen(true);
                return;
            }
        }

        // 사업자등록번호 없을 경우 확인
        if (!hasBizNo) {
            if (!noBizChk.name) {
                setModalMessage("이름을 입력 해주세요.")
                setModalOpen(true);
                return;
            }
            if (!noBizChk.s_link) {
                setModalMessage("SNS 주소를 입력 해주세요.")
                setModalOpen(true);
                return;
            }
        }

        // 기본 값 유효성 확인
        if (validateForm()) {
            const files = filesRef?.current?.files;

            const formData = new FormData();

            if (files) {
                for (let i = 0; i < files.length; i++) {
                    formData.append("files", files[i])
                    console.log(files[i]);
                }
            }

            if (hasBizNo){
                formData.append('bizNo', bizChk.b_no)
                formData.append('name', bizChk.p_nm)
                formData.append('openDate', bizChk.start_dt)
            }

            if (!hasBizNo){
                formData.append('name',noBizChk.name)
                formData.append('snsAddr',noBizChk.s_link)
            }

            formData.append('email', userEmail)
            formData.append('phone', userPhone)

            return registryApplier(formData)
                .then(() => {
                    setTimeout(() => {
                        setLoading(false);
                        setModalMessage(`성공적으로 등록이 완료되었습니다.`); // 성공 메시지
                        setModalOpen(true);
                    }, 400);
                    // 등록후 input 초기화
                    initAll()
                })
                .catch(() => {
                    setModalMessage("등록에 실패했습니다."); // 실패 메시지
                    setModalOpen(true);
                });
        }

        setTimeout(() => {
            setLoading(false);
            setModalMessage("사업자 등록번호 인증 혹은 이메일을 확인 해주시길바랍니다")
            setModalOpen(true);
        }, 400);
        return
    };

    return (
        <div className="w-full p-8 bg-white rounded-xl border border-white">
            <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl border border-white">
                {loading && <LoadingComponent/>}
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">협회 등록 신청</h2>

                {/* 탭 전환 */}
                <div className="mb-6 flex space-x-4 mt-10">
                    <button
                        className={`p-2 rounded-lg font-medium ${hasBizNo ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}
                        onClick={() => setHasBizNo(true)}
                    >
                        사업자등록번호 있음
                    </button>
                    <button
                        className={`p-2 rounded-lg font-medium ${!hasBizNo ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"}`}
                        onClick={() => setHasBizNo(false)}
                    >
                        사업자등록번호 없음
                    </button>
                </div>

                {/*사업자 등록번호 가 있을경우 입력창*/}
                {hasBizNo && <>
                    {/* 1 사업자등록번호 & 성명 (대표자) */}
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="block text-gray-600 mb-2 text-sm font-medium">사업자등록번호</label>
                            <input
                                type="text"
                                placeholder="사업자등록번호를 입력하세요"
                                value={bizChk.b_no}
                                onChange={(e) => setBizChk({...bizChk, b_no: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-gray-600 mb-2 text-sm font-medium">성명 (대표자)</label>
                            <input
                                type="text"
                                placeholder="성명을 입력하세요"
                                value={bizChk.p_nm}
                                onChange={(e) => setBizChk({...bizChk, p_nm: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* 개업일 & 인증확인 */}
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="block text-gray-600 mb-2 text-sm font-medium">개업일</label>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="date"
                                    value={bizChk.start_dt}
                                    onChange={(e) => setBizChk({...bizChk, start_dt: e.target.value})}
                                    className="w-4/5 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {/* 인증 확인 버튼 */}
                                <button
                                    type="button"
                                    onClick={handleBizNoVerify}
                                    className={`min-w-fit p-3 rounded-lg text-white font-medium ${bizNoVerified ? "bg-green-400" : "bg-gray-400"} focus:outline-none hover:bg-opacity-90 transition duration-200`}
                                >
                                    {bizNoVerified ? "인증 완료" : "인증 확인"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 인증 결과 메시지 */}
                    {bizNoVerified !== null && (
                        <div className="mt-4 text-center">
                            {bizNoVerified ? (
                                <span className="text-green-600 font-semibold">정상적으로 인증 되었습니다.</span>
                            ) : (
                                <span className="text-red-600 font-semibold">인증에 실패 하였습니다. 확인 후 다시 시도 해주세요.</span>
                            )}
                        </div>
                    )}
                </>}
                {/*사업자 등록번호 가 없을경우 입력창*/}
                {!hasBizNo && <>
                    {/* 성명 & SNS주소 */}
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="block text-gray-600 mb-2 text-sm font-medium">성명</label>
                            <input
                                type="text"
                                placeholder="성명을 입력하세요"
                                value={noBizChk.name}
                                onChange={(e) => setNoBizChk({...noBizChk, name: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-gray-600 mb-2 text-sm font-medium">SNS 주소</label>
                            <input
                                type="text"
                                placeholder="SNS 주소를 입력하세요"
                                value={noBizChk.s_link}
                                onChange={(e) => setNoBizChk({...noBizChk, s_link: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </>}


                {/* 이메일 */}
                <div className="mb-6 grid grid-cols-1 gap-4">
                    <div className="flex flex-col">
                        <label className="block text-gray-600 mb-2 text-sm font-medium">이메일</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                readOnly={emailVerified === true}
                                placeholder="이메일을 입력하세요"
                                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            {/* 이메일 인증 버튼 */}
                            <div className="min-w-fit">
                                <button
                                    onClick={handleCLickSendEmail}
                                    className="w-full p-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 focus:outline-none"
                                >
                                    이메일 인증
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* 인증 코드 입력 처리 */}
                    {emailVerified !== null && (
                        <div className="flex flex-col">
                            <label className="block text-gray-600 text-sm font-medium">인증 코드</label>
                            <div className="flex items-center gap-2">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={emailAuthCode}
                                        readOnly={emailVerified}
                                        onChange={(e) => setEmailAuthCode(e.target.value)}
                                        placeholder="인증 코드를 입력하세요"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* 인증 확인 버튼 */}
                                <div>
                                    <button
                                        className="p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none"
                                        onClick={handleCLickCheckEmail}
                                    >
                                        인증 확인
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 인증 상태 표시 */}
                    {emailVerified && (
                        <div className="mt-4 text-center">
                            <span className="text-green-600 font-semibold">정상적으로 인증 되었습니다.</span>
                        </div>
                    )}
                </div>


                {/* 연락처 */}
                <div className="mb-6 grid grid-cols-1 gap-4">
                    <div className="flex flex-col">
                        <label className="block text-gray-600 mb-2 text-sm font-medium">
                            연락처
                        </label>
                        <input
                            type="text"
                            placeholder="연락처를 입력하세요"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>
                </div>

                {/* 파일 입력 */}
                <div className="mb-6">
                    <label className="block text-gray-600 mb-2 text-sm font-medium">첨부 파일 (포트폴리오)</label>
                    <input type="file" ref={filesRef} multiple={true}
                           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>

                {/* 제출 버튼 */}
                <button
                    onClick={handleClickSubmit}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    제출하기
                </button>

                {/* 알림 모달 */}
                {modalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <div className="flex flex-col justify-center bg-white p-8 rounded-lg shadow-lg">
                            <p className="text-xl">{modalMessage}</p>
                            <button
                                onClick={closeModal}
                                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 transition duration-200"
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

export default RegisterComponent;
