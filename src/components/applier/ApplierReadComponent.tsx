import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingComponent from "../common/LoadingComponent.tsx";
import { IApplierRead } from "../../types/applier/applier.ts";
import { getApplier, modifyApplierStatus } from "../../apis/applierAPI.ts";

const InitialApplier: IApplierRead = {
    ano: 0,
    bizNo: "",
    openDate: "",
    name: "",
    email: "",
    regStatus: "",
    attachFileNames: [],
    regDate: "",
};

const ApplierReadComponent = () => {
    const { ano } = useParams();
    const [query] = useSearchParams();
    const navigate = useNavigate();
    const queryStr = new URLSearchParams(query).toString();

    const [loading, setLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [applier, setApplier] = useState<IApplierRead>(InitialApplier);
    const [rejectModal, setRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState<string>("");

    const handleMoveToList = () => {
        navigate(`/applier/list?${queryStr}`);
    };

    const handleClickStatus = (status: number) => {
        setLoading(true);
        if (status === 2) {
            setRejectModal(false);
            setRejectReason("");
        }

        modifyApplierStatus(Number(ano), status, status === 2 ? rejectReason : undefined)
            .then(() => {
                setLoading(false);
                setModalMessage(`${status === 1 ? "승인" : "반려"} 처리가 완료 되었습니다.`);
                setModalOpen(true);
            })
            .catch(() => {
                setModalMessage(`${status === 1 ? "승인" : "반려"} 가 실패 되었습니다. \n 확인후 다시 해주시길 바랍니다.`);
                setModalOpen(true);
            });
    };

    const closeModal = () => {
        setModalOpen(false);
        handleMoveToList();
    };

    useEffect(() => {
        setLoading(true);
        getApplier(Number(ano)).then((data) => {
            setApplier(data);
            setTimeout(() => setLoading(false), 400);
        });
    }, [ano]);

    const fileList = {
        nonImageFiles: applier.attachFileNames?.filter((fileName) => !fileName.match(/\.(jpg|jpeg|png|gif)$/i))
            .map((fileName, index) => {
                const actualFileName = fileName.split('_').pop() ?? '';
                const linkFileName = fileName.split('/').pop() ?? '';
                const originalFilePath = `https://s3.ap-northeast-2.amazonaws.com/oz-wizard-bucket/creator/portfolio/${linkFileName}`;
                const isPdf = linkFileName.match(/\.pdf$/i);
                const isPpt = linkFileName.match(/\.(ppt|pptx)$/i);

                return (
                    <div key={index} className="flex justify-between items-center py-4 border-b">
                        <div className="text-gray-600">{actualFileName}</div>
                        <div className="flex space-x-4">
                            {isPdf || isPpt ? (
                                <a
                                    href={originalFilePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    미리보기
                                </a>
                            ) : (
                                <span className="text-gray-500">다운로드 불가</span>
                            )}
                        </div>
                    </div>
                );
            }),

        imageFiles: applier.attachFileNames?.filter((fileName) => fileName.match(/\.(jpg|jpeg|png|gif)$/i))
            .map((fileName, index) => {
                const actualFileName = fileName.split('_').pop() ?? '';
                const linkFileName = fileName.split('/').pop() ?? '';
                const originalFilePath = `https://s3.ap-northeast-2.amazonaws.com/oz-wizard-bucket/creator/portfolio/${linkFileName}`;

                return (
                    <div key={index} className="flex justify-between items-center py-4 border-b">
                        <div className="text-gray-600">{actualFileName}</div>
                        <div className="flex space-x-4">
                            <a
                                href={originalFilePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                미리보기
                            </a>
                            <a
                                href={originalFilePath}
                                download
                                className="text-green-600 hover:text-green-800"
                            >
                                다운로드
                            </a>
                        </div>
                    </div>
                );
            }),
    };

    return (
        <div className="pt-5 pb-5 w-full mx-auto">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                    <LoadingComponent />
                </div>
            )}

            <div className="text-3xl font-semibold text-center mb-8">신청관리 상세조회</div>

            <div className={`mt-6 px-6 space-y-6 ${loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                {/* 등록 정보 섹션 */}
                <div className="mb-8">
                    <div className="text-2xl font-semibold text-gray-700 mb-4">등록 내용</div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center">
                            <span className="w-40 text-gray-600 font-semibold">등록번호</span>
                            <span className="text-gray-600">{applier.ano}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-40 text-gray-600 font-semibold">등록일</span>
                            <span className="text-gray-600">{applier.regDate}</span>
                        </div>
                    </div>
                </div>

                {/* 사업자 정보 섹션 */}
                <div className="mb-8">
                    <div className="text-2xl font-semibold text-gray-700 mb-4">사업자 정보</div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-center">
                            <span className="w-40 text-gray-600 font-semibold">사업자 등록 번호</span>
                            <span className="text-gray-600">{applier.bizNo}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-40 text-gray-600 font-semibold">성명(대표자)</span>
                            <span className="text-gray-600">{applier.name}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-40 text-gray-600 font-semibold">개업일</span>
                            <span className="text-gray-600">{applier.openDate}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-40 text-gray-600 font-semibold">대표 이메일</span>
                            <span className="text-gray-600">{applier.email}</span>
                        </div>
                    </div>
                </div>

                {/* 파일 목록 섹션 */}
                <div className="mb-8">
                    <div className="text-2xl font-semibold text-gray-700 mb-4">파일 목록</div>
                    {/* 이미지 파일 */}
                    {fileList.imageFiles}

                    {/* 이미지가 아닌 파일 */}
                    {fileList.nonImageFiles}
                </div>

                {/* 버튼들 */}
                <div className="flex gap-4 mt-6 justify-between">
                    <button
                        onClick={handleMoveToList}
                        className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                        목록
                    </button>

                    {applier.regStatus === "PENDING" && (
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleClickStatus(1)}
                                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                            >
                                승인
                            </button>
                            <button
                                onClick={() => setRejectModal(true)}
                                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                            >
                                반려
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* 알림 모달 */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="flex flex-col justify-center bg-white p-8 rounded-lg shadow-lg">
                        <p className="text-xl">{modalMessage}</p>
                        <button
                            onClick={closeModal}
                            className="mt-4 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}

            {/* 반려 사유 모달 */}
            {rejectModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm mx-auto">
                        <h3 className="text-lg font-semibold">반려 사유 입력</h3>
                        <textarea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            rows={4}
                            className="w-full p-4 mt-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="mt-4 flex gap-3">
                            <button
                                onClick={() => setRejectModal(false)}
                                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                            >
                                취소
                            </button>
                            <button
                                onClick={() => handleClickStatus(2)}
                                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                            >
                                반려 처리
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplierReadComponent;
