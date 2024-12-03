import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingComponent from "../common/LoadingComponent.tsx";
import { IApplierRead } from "../../types/applier/applier.ts";
import { getApplier } from "../../apis/applierAPI.ts";

const InitialApplier: IApplierRead = {
    ano: 0,
    bizNo:0,
    openDate: "",
    name: "",
    email: "",
    applierStatus: "",
    attachFileNames: [],
    regDate: ""
};

function ApplierReadComponent() {
    const { ano } = useParams();
    const [query] = useSearchParams();
    const navigate = useNavigate();
    const queryStr = new URLSearchParams(query).toString();

    const [loading, setLoading] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState(false);
    // const [modalMessage, setModalMessage] = useState("");
    const [applier, setApplier] = useState<IApplierRead>(InitialApplier);

    // 리스트 목록 이동
    const handleMoveToList = () => {
        navigate(`/applier/list?${queryStr}`);
    };

    // 알림 모달 닫기
    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        setLoading(true);
        getApplier(Number(ano)).then((data) => {
            setApplier(data);
            setTimeout(() => {
                setLoading(false);
            }, 600);
        });
    }, [ano]);

    // 이미지 div 목록
    const imgDivs = (
        <div className="w-full p-4">
            {/* 이미지가 아닌 파일 리스트 */}
            <div className="mb-8">
                {applier.attachFileNames &&
                    applier.attachFileNames
                        .filter((fileName) => !fileName.match(/\.(jpg|jpeg|png|gif)$/i))
                        .map((fileName, index) => {
                            const actualFileName = fileName.split('_').pop() ?? '';
                            const linkFileName = fileName.split('/').pop() ?? '';
                            const originalFilePath = `https://s3.ap-northeast-2.amazonaws.com/oz-wizard-bucket/creator/portfolio/${linkFileName}`;
                            const isPdf = linkFileName.match(/\.pdf$/i);
                            const isPpt = linkFileName.match(/\.(ppt|pptx)$/i);

                            return (
                                <p key={index} className="mb-4">
                                    {isPdf ? (
                                        <>
                                            <a
                                                href={originalFilePath}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 font-semibold hover:text-blue-800 hover:underline"
                                            >
                                                {actualFileName} (미리보기)
                                            </a>
                                            <br/>
                                            <a
                                                href={originalFilePath}
                                                download
                                                className="text-sm text-gray-500 hover:text-gray-700"
                                            >
                                                다운로드
                                            </a>
                                        </>
                                    ) : isPpt ? (
                                        <>
                                            <a
                                                href={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
                                                    originalFilePath
                                                )}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 font-semibold hover:text-blue-800 hover:underline"
                                            >
                                                {actualFileName} (미리보기)
                                            </a>
                                            <br/>
                                            <a
                                                href={originalFilePath}
                                                download
                                                className="text-sm text-gray-500 hover:text-gray-700"
                                            >
                                                다운로드
                                            </a>
                                        </>
                                    ) : (
                                        <a
                                            href={originalFilePath}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 font-semibold hover:text-blue-800 hover:underline"
                                        >
                                            {actualFileName}
                                        </a>
                                    )}
                                </p>
                            );
                        })}
            </div>

            {/* 이미지 파일 그리드 */}
            <div className="grid grid-cols-3 gap-4">
                {applier.attachFileNames &&
                    applier.attachFileNames
                        .filter((fileName) => fileName.match(/\.(jpg|jpeg|png|gif)$/i))
                        .map((fileName, index) => {
                            const actualFileName = fileName.split('_').pop() ?? '';
                            const linkFileName = fileName.split('/').pop() ?? '';
                            const originalFilePath = `https://s3.ap-northeast-2.amazonaws.com/oz-wizard-bucket/creator/portfolio/${linkFileName}`;

                            return (
                                <a
                                    key={index}
                                    href={originalFilePath}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block border border-black overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <img
                                        src={originalFilePath}
                                        alt={actualFileName}
                                        className="w-full h-full object-center hover:scale-105 transition-transform duration-300"
                                    />
                                </a>
                            );
                        })}
            </div>
        </div>
    )


    return (
        <div className="pt-5 pb-5 w-full mx-auto">
            {loading && <LoadingComponent/>}
            <div className="px-4 space-y-6">
                {/* 등록 정보 */}
                <div className="flex gap-6">
                    {/* 등록번호 */}
                    <div className="bg-white p-4 border border-black w-1/3">
                        <span className="text-gray-700 font-semibold">등록번호</span>
                        <p className="text-gray-600">{applier.ano}</p>
                    </div>

                    {/* 등록일 */}
                    <div className="bg-white p-4 border border-black w-1/3">
                        <span className="text-gray-700 font-semibold">등록일</span>
                        <p className="text-gray-600">{applier.regDate}</p>
                    </div>
                </div>

                {/* 사업자 정보 */}
                <div className="flex flex-col gap-2 border border-gray-200 p-2">
                    {/* 사업자 등록 번호 */}
                    <div className="bg-white p-4 border border-black">
                        <span className="text-gray-700 font-semibold">사업자 등록 번호</span>
                        <p className="text-gray-600">{applier.bizNo}</p>
                    </div>

                    {/* 이름 */}
                    <div className="bg-white p-4 border border-black">
                        <span className="text-gray-700 font-semibold">성명(대표자)</span>
                        <p className="text-gray-600">{applier.name}</p>
                    </div>

                    {/* 등록일 */}
                    <div className="bg-white p-4 border border-black">
                        <span className="text-gray-700 font-semibold">개업일</span>
                        <p className="text-gray-600">{applier.openDate}</p>
                    </div>

                    {/* 이메일 */}
                    <div className="bg-white p-4 border border-black">
                        <span className="text-gray-700 font-semibold">대표 이메일</span>
                        <p className="text-gray-600">{applier.email}</p>
                    </div>
                </div>

                {/* 이미지 목록 */}
                {imgDivs && <div className="flex flex-wrap -m-2">{imgDivs}</div>}

                {/* 버튼들 */}
                <div className="flex gap-4 mt-6 justify-between">
                    <button
                        onClick={handleMoveToList}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 transition duration-200"
                    >
                        목록
                    </button>
                    <div className="flex gap-3">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 transition duration-200"
                        >
                            승인
                        </button>

                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50 transition duration-200"
                        >
                            반려
                        </button>
                    </div>
                </div>
            </div>

            {/* 알림 모달 */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="flex flex-col justify-center bg-white p-8 rounded-lg shadow-lg">
                        {/*<p className="text-xl">{modalMessage}</p>*/}
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
    );
}

export default ApplierReadComponent;
