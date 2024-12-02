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

    const queryStr = createSearchParams({
        page: String(page),
        size: String(size)
    });

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
        setLoading(true);
        getApplierList(page, size).then((data) => {
            setPageResponse(data);
            setTimeout(() => {
                setLoading(false);
            }, 400);
        });
    }, [page, size]);

    const ListDiv =
        Array.isArray(pageResponse.dtoList) && pageResponse.dtoList.length > 0 ? (
            pageResponse.dtoList.map((applier) => {
                const { ano, name, regDate, regStatus} = applier;
                return (
                    <div
                        key={ano}
                        onClick={() => moveToRead(ano)}
                        className="grid grid-cols-12 border border-b-0 border-gray-400 text-center text-xs text-gray-600 uppercase tracking-wider">
                        <div
                            className="col-span-3 h-full p-2 flex justify-center items-center border-r border-gray-400">
                            <span>{ano}</span>
                        </div>
                        <div
                            className="col-span-5 h-full p-2 flex justify-center items-center border-r border-gray-400">
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
                {/* grid table */}
                <div className={`px-4 ${loading && "hidden"}`}>
                    <div className="min-w-full leading-normal">
                        {/* table header */}
                        <div
                            className="grid grid-cols-12 h-15 border border-b-0 border-gray-400 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <div
                                className="col-span-3 p-2 flex justify-center items-center border-r border-gray-400">
                                <span>등록 번호</span>
                            </div>
                            <div
                                className="col-span-5 p-2 flex justify-center items-center border-r border-gray-400">
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