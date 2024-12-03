import {useRef, useState} from 'react';
import {IBizChk} from "../../types/applier/biz.ts";
import {bizValidateChk} from "../../apis/bizAPI.ts";

const InitialChk: IBizChk = {
    b_no: "",
    p_nm: "",
    start_dt: "",
};

function RegistrationForm() {
    const [bizChk, setBizChk] = useState<IBizChk>(InitialChk);
    const [isVerified, setIsVerified] = useState<boolean>(false); // 인증 여부 상태
    const filesRef = useRef<HTMLInputElement>(null)

    // 인증 확인 버튼 클릭
    const handleVerify = () => {
        bizValidateChk(bizChk)
            .then(response => {
                const firstItem = response.data[0];
                const bNo = firstItem.b_no;
                const valid = firstItem.valid;

                setIsVerified( valid === '01' && bNo !== null ? true : false );
            });
    };


    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">협회 등록 신청</h2>

            <div className="border border-gray-200 p-6 mb-6 rounded-lg shadow-sm bg-white">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800">사업자 정보 확인</h3>

                {/* 사업자등록번호 & 성명 (대표자) */}
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
                        <div className="flex gap-2">
                            <input
                                type="date"
                                value={bizChk.start_dt}
                                onChange={(e) => setBizChk({...bizChk, start_dt: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* 인증 확인 버튼 */}
                            <button
                                type="button"
                                onClick={handleVerify}
                                className={`min-w-fit p-3 rounded-lg text-white font-medium ${isVerified ? 'bg-green-400' : 'bg-gray-400'} focus:outline-none hover:bg-opacity-90 transition duration-200`}
                            >
                                {isVerified ? '인증 완료' : '인증 확인'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 인증 결과 메시지 */}
                <div className="mt-4 text-center">
                    {isVerified ? (
                        <span className="text-green-600 font-semibold">정상적으로 인증 되었습니다.</span>
                    ) : (
                        <span className="text-red-600 font-semibold">인증에 실패 하였습니다. 확인 후 다시 시도 해주세요.</span>
                    )}
                </div>
            </div>


            {/* 이메일 */}
            <div className="mb-6 grid grid-cols-1 gap-4">
                <div className="flex flex-col">
                    <label className="block text-gray-600 mb-2 text-sm font-medium">이메일</label>
                    <input
                        type="text"
                        placeholder="이메일을 입력하세요"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            {/* 파일 입력 */}
            <div className="mb-6">
                <label className="block text-gray-600 mb-2 text-sm font-medium">첨부 파일 (포트폴리오)</label>
                <input type="file" ref={filesRef} multiple={true} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            {/* 제출 버튼 */}
            <button
                className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
                제출하기
            </button>
        </div>
    );
}

export default RegistrationForm;
