import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IPageResponse } from "../../types/pageResponse.ts";
import { IApplierList } from "../../types/applier/applier.ts";
import LoadingComponent from "../common/LoadingComponent.tsx";
import { getApplierList } from "../../apis/applierAPI.ts";
import PageComponent from "../common/PageComponent.tsx";

const initialState: IPageResponse<IApplierList> = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: { page: 1, size: 10 },
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

    const handleSearch = () => {
        setLoading(true);
        getApplierList(1, size, filters).then((data) => {
            setPageResponse(data);
            setLoading(false);
        });
    };

    const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const moveToRead = (ano: number) => {
        const filteredFilters = Object.fromEntries(
            Object.entries(filters)
                .filter(([_, value]) => value.trim() !== "") // key는 _로 대체하여 사용하지 않겠다고 명시
        );


        const queryStr = createSearchParams({
            page: String(page),
            size: String(size),
            ...filteredFilters
        });

        navigate({
            pathname: `/applier/read/${ano}`,
            search: `${queryStr}`
        });
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'bg-gray-300 text-gray-600';
            case 'ACCEPTED':
                return 'bg-green-300 text-green-600';
            case 'REJECTED':
                return 'bg-red-300 text-red-600';
            default:
                return 'bg-gray-200 text-gray-500';
        }
    };

    useEffect(() => {
        setLoading(true);
        getApplierList(page, size, filters).then((data) => {
            setPageResponse(data);
            setTimeout(() => setLoading(false), 400);
        });
    }, [page, size]);

    const ListDiv =
        Array.isArray(pageResponse.dtoList) && pageResponse.dtoList.length > 0 && (
            pageResponse.dtoList.map((applier) => {
                const { ano, name, bizNo, regDate, regStatus } = applier;
                return (
                    <div
                        key={ano}
                        onClick={() => moveToRead(ano)}
                        className="grid grid-cols-12 border border-b-0 border-gray-400 text-center text-sm text-gray-600 uppercase tracking-wider">
                        <div className="col-span-2 h-full p-3 flex justify-center items-center border-r border-gray-400">
                            <span>{ano}</span>
                        </div>
                        <div className="col-span-2 h-full p-3 flex justify-center items-center border-r border-gray-400">
                            <span>{bizNo ? bizNo : "사업자 번호 없음"}</span>
                        </div>
                        <div className="col-span-4 h-full p-3 flex justify-center items-center border-r border-gray-400">
                            <span>{name}</span>
                        </div>
                        <div className="col-span-2 h-full p-3 flex justify-center items-center border-r border-gray-400">
                            <span>{regDate}</span>
                        </div>
                        <div className={`col-span-2 h-full p-3 flex justify-center items-center border-r border-gray-400 ${getStatusClass(regStatus)}`}>
                            <span>{regStatus}</span>
                        </div>
                    </div>
                );
            })
        )

    return (
        <div className="flex flex-col">
            <div className="text-4xl font-semibold py-5 border-b-2 border-gray-500">신청관리 목록</div>
            <div className="w-full py-8">
                {loading && <LoadingComponent />}

                <div className="grid grid-cols-6 gap-6 mb-8">
                    <input
                        type="text"
                        name="ano"
                        placeholder="등록 번호"
                        value={filters.ano}
                        onChange={handleFilterInputChange}
                        className="border p-3 text-lg"
                    />
                    <input
                        type="text"
                        name="bizNo"
                        placeholder="사업자 등록 번호"
                        value={filters.bizNo}
                        onChange={handleFilterInputChange}
                        className="border p-3 text-lg"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="이름"
                        value={filters.name}
                        onChange={handleFilterInputChange}
                        className="border p-3 text-lg"
                    />
                    <input
                        type="date"
                        name="regDate"
                        value={filters.regDate}
                        onChange={handleFilterInputChange}
                        className="border p-3 text-lg"
                    />
                    <select
                        name="regStatus"
                        value={filters.regStatus}
                        onChange={handleFilterInputChange}
                        className="border p-3 text-lg">
                        <option value="">전체 상태</option>
                        <option value="PENDING">PENDING</option>
                        <option value="ACCEPTED">ACCEPTED</option>
                        <option value="REJECTED">REJECTED</option>
                    </select>
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-6 py-3 text-lg">
                        검색
                    </button>
                </div>

                <div className={`px-6 ${loading && "hidden"}`}>
                    {pageResponse.dtoList.length > 0 &&
                    <div className="min-w-full leading-normal">
                        <div
                            className="grid grid-cols-12 h-20 border border-b-0 border-gray-400 bg-gray-100 text-center text-lg font-semibold text-gray-600 uppercase tracking-wider">
                            <div className="col-span-2 p-4 flex justify-center items-center border-r border-gray-400">
                                <span>등록 번호</span>
                            </div>
                            <div className="col-span-2 p-4 flex justify-center items-center border-r border-gray-400">
                                <span>사업자 등록 번호</span>
                            </div>
                            <div className="col-span-4 p-4 flex justify-center items-center border-r border-gray-400">
                                <span>이름</span>
                            </div>
                            <div className="col-span-2 p-4 flex justify-center items-center border-r border-gray-400">
                                <span>등록일</span>
                            </div>
                            <div className="col-span-2 p-4 flex justify-center items-center border-r border-gray-400">
                                <span>상태</span>
                            </div>
                        </div>

                        <div className="overflow-y-auto border-b border-gray-500">
                            {ListDiv}
                        </div>

                    </div>
                    }
                    {pageResponse.dtoList.length <= 0 &&
                        <div
                            className="flex justify-center items-center h-full w-full text-2xl font-bold text-gray-600">
                            데이터가 없습니다.
                        </div>
                    }
                    <PageComponent pageResponse={pageResponse} />
                </div>
            </div>
        </div>
    );
}

export default ApplierListComponent;
