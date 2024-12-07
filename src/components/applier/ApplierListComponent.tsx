import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IPageResponse} from "../../types/pageResponse.ts";
import {IApplierList} from "../../types/applier/applier.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import {getApplierList} from "../../apis/applierAPI.ts";
import PageComponent from "../common/PageComponent.tsx";

const initialState: IPageResponse<IApplierList> = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: {page: 1, size: 10,},
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    current: 1,
    totalPage: 0
};

function ApplierListComponent() {

    const navigate = useNavigate();

    const [query] = useSearchParams();

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageResponse<IApplierList>>(initialState);
    // 검색 조건 상태
    const [filters, setFilters] = useState({
        ano: query.get("ano") || "",
        bizNo: query.get("bizNo") || "",
        name: query.get("name") || "",
        regDate: query.get("regDate") || "",
        regStatus: query.get("regStatus") || ""
    });

    const queryStr = createSearchParams({
        page: String(page),
        size: String(size),
        ...filters
    });

    // 검색 핸들러
    const handleSearch = () => {
        setLoading(true);
        getApplierList(1, size, filters).then((data) => {
            setPageResponse(data);
            setLoading(false);
        }).catch((error) => {
            console.error("검색 오류:", error);
            setLoading(false);
        });
    };

    const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const moveToRead = (ano:number) => {
        navigate({
            pathname: `/applier/read/${ano}`,
            search:`${queryStr}`
        })
    }

    // 상태별 CSS 색상
    const getStatusClass = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-gray-300 text-gray-600'; // 회색
            case 'ACCEPTED':
                return 'bg-green-300 text-green-600'; // 초록색
            case 'REJECTED':
                return 'bg-red-300 text-red-600'; // 빨간색
            default:
                return 'bg-gray-200 text-gray-500'; // 기본 회색
        }
    };

    useEffect(() => {


        // // 로그인 쿠키가 없다면 로그인 페이지로 리디렉션
        // if (!adminLoginCookie) {
        //     navigate("/login");
        // }

        setLoading(true);
        getApplierList(page, size, filters).then((data) => {
            console.log(data)
            setPageResponse(data);
            setTimeout(() => {
                setLoading(false);
            }, 400);
        });
    }, [page, size]);

    const ListDiv =
        Array.isArray(pageResponse.dtoList) && pageResponse.dtoList.length > 0 ? (
            pageResponse.dtoList.map((applier) => {
                const { ano, name,bizNo, regDate, regStatus} = applier;
                return (
                    <div
                        key={ano}
                        onClick={() => moveToRead(ano)}
                        className="grid grid-cols-12 border border-b-0 border-gray-400 text-center text-xs text-gray-600 uppercase tracking-wider">
                        <div
                            className="col-span-2 h-full p-2 flex justify-center items-center border-r border-gray-400">
                            <span>{ano}</span>
                        </div>
                        <div
                            className="col-span-2 h-full p-2 flex justify-center items-center border-r border-gray-400">
                            <span>{bizNo}</span>
                        </div>
                        <div
                            className="col-span-4 h-full p-2 flex justify-center items-center border-r border-gray-400">
                            <span>{name}</span>
                        </div>
                        <div
                            className="col-span-2 h-full p-2 flex justify-center items-center border-r border-gray-400">
                            <span>{regDate}</span>
                        </div>
                        <div
                            className={`col-span-2 h-full p-2 flex justify-center items-center border-r border-gray-400 ${getStatusClass(regStatus)}`}>
                            <span>{regStatus}</span>
                        </div>
                    </div>
                );
            })
        ) : (
            <div>데이터가 없습니다.</div>
        );

    return (
        <>
            <div className="w-full py-8">
                {loading && <LoadingComponent/>}

                {/* 검색창 섹션 */}
                <div className="grid grid-cols-6 gap-4 mb-6">
                    <input
                        type="text"
                        name="ano"
                        placeholder="등록 번호"
                        value={filters.ano}
                        onChange={handleFilterInputChange}
                        className="border p-2 text-sm"
                    />
                    <input
                        type="text"
                        name="bizNo"
                        placeholder="사업자 등록 번호"
                        value={filters.bizNo}
                        onChange={handleFilterInputChange}
                        className="border p-2 text-sm"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="이름"
                        value={filters.name}
                        onChange={handleFilterInputChange}
                        className="border p-2 text-sm"
                    />
                    <input
                        type="date"
                        name="regDate"
                        value={filters.regDate}
                        onChange={handleFilterInputChange}
                        className="border p-2 text-sm"
                    />
                    <select
                        name="regStatus"
                        value={filters.regStatus}
                        onChange={handleFilterInputChange}
                        className="border p-2 text-sm">
                        <option value="">상태 선택</option>
                        <option value="0">PENDING</option>
                        <option value="1">ACCEPTED</option>
                        <option value="2">REJECTED</option>
                    </select>
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white px-4 py-2 text-sm">
                        검색
                    </button>
                </div>

                {/* grid table */}
                <div className={`px-4 ${loading && "hidden"}`}>
                    <div className="min-w-full leading-normal">
                        {/* table header */}
                        <div
                            className="grid grid-cols-12 h-15 border border-b-0 border-gray-400 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <div
                                className="col-span-2 p-2 flex justify-center items-center border-r border-gray-400">
                                <span>등록 번호</span>
                            </div>
                            <div
                                className="col-span-2 p-2 flex justify-center items-center border-r border-gray-400">
                                <span>사업자 등록 번호</span>
                            </div>
                            <div
                                className="col-span-4 p-2 flex justify-center items-center border-r border-gray-400">
                                <span>이름</span>
                            </div>
                            <div
                                className="col-span-2 p-2 flex justify-center items-center border-r border-gray-400">
                                <span>등록일</span>
                            </div>
                            <div
                                className="col-span-2 p-2 flex justify-center items-center border-r border-gray-400">
                                <span>상태</span>
                            </div>
                        </div>
                        {/* table body */}
                        <div className="overflow-y-auto">
                            {ListDiv}
                        </div>
                        {/* table footer */}
                        <div
                            className="grid grid-cols-12 h-15 p-3 border-t border-gray-400 text-center text-xs text-gray-600 uppercase tracking-wider">

                        </div>
                    </div>
                    <PageComponent pageResponse={pageResponse}/>
                </div>
            </div>
        </>
    );
}

export default ApplierListComponent;