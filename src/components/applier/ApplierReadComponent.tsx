import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingComponent from "../common/LoadingComponent.tsx";
import { IApplierRead } from "../../types/applier/applier.ts";
import { getApplier } from "../../apis/applierAPI.ts";

const InitialApplier: IApplierRead = {
    ano: 0,
    name: "",
    email: "",
    zipcode: "",
    roadAddr: "",
    lotNumAddr: "",
    detailAddr: "",
    addrEtc: "",
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
    const imgDivs = applier.attachFileNames.map((fileName) => (
        <div key={fileName} className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <img
                alt=""
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
            />
        </div>
    ));

    return (
        <div className="pt-5 pb-5 w-full mx-auto">
            {loading && <LoadingComponent />}
            <div className="px-4 space-y-6">
                {/* 정보 항목들을 flex로 배치 */}
                <div className="flex gap-6">
                    {/* 등록번호 */}
                    <div className="bg-white p-4 shadow-md rounded-lg border border-gray-200 w-1/3">
                        <span className="text-gray-700 font-semibold">등록번호</span>
                        <p className="text-gray-600">{applier.ano}</p>
                    </div>

                    {/* 이름 */}
                    <div className="bg-white p-4 shadow-md rounded-lg border border-gray-200 w-1/3">
                        <span className="text-gray-700 font-semibold">이름</span>
                        <p className="text-gray-600">{applier.name}</p>
                    </div>

                    {/* 이메일 */}
                    <div className="bg-white p-4 shadow-md rounded-lg border border-gray-200 w-1/3">
                        <span className="text-gray-700 font-semibold">이메일</span>
                        <p className="text-gray-600">{applier.email}</p>
                    </div>
                </div>

                {/* 주소 정보 */}
                <div className="bg-white p-4 shadow-md rounded-lg border border-gray-200 w-full">
                    <span className="text-gray-700 font-semibold">주소</span>
                    <div className="flex flex-col gap-4 mt-4">

                        {/* 우편번호 */}
                        <div className="flex items-center">
                            <span className="text-gray-600 font-medium w-1/4">우편번호:</span>
                            <span className="text-gray-600 w-3/4">{applier.zipcode}</span>
                        </div>

                        {/* 도로명주소와 지번주소 */}
                        <div className="flex items-center">
                            <span className="text-gray-600 font-medium w-1/4">도로명주소:</span>
                            <span className="text-gray-600 w-1/4">{applier.roadAddr}</span>
                            <span className="text-gray-600 font-medium w-1/4">지번주소:</span>
                            <span className="text-gray-600 w-1/4">{applier.lotNumAddr}</span>
                        </div>

                        {/* 상세주소와 비고 */}
                        <div className="flex items-center">
                            <span className="text-gray-600 font-medium w-1/4">상세주소:</span>
                            <span className="text-gray-600 w-1/4">{applier.detailAddr}</span>
                            <span className="text-gray-600 font-medium w-1/4">비고:</span>
                            <span className="text-gray-600 w-1/4">{applier.addrEtc}</span>
                        </div>

                    </div>
                </div>

                {/* 등록일 */}
                <div className="bg-white p-4 shadow-md rounded-lg border border-gray-200 w-1/3">
                    <span className="text-gray-700 font-semibold">등록일</span>
                    <p className="text-gray-600">{applier.regDate}</p>
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
