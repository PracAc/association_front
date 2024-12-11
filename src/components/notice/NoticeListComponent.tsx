import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import LoadingComponent from "../common/LoadingComponent.tsx";
import PageComponent from "../common/PageComponent.tsx";
import {IPageResponse} from "../../types/pageResponse.ts";
import {getBoardList} from "../../apis/boardAPI.ts";
import {IBoard} from "../../types/iboard.ts";

const initialState: IPageResponse<IBoard> = {
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

function NoticeListComponent() {

    const navigate = useNavigate();

    const [query] = useSearchParams();

    const page: number = Number(query.get("page")) || 1;
    const size: number = Number(query.get("size")) || 10;

    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageResponse<IBoard>>(initialState);

    const queryStr = createSearchParams({
        page: String(page),
        size: String(size)
    });

    const moveToRead = (qno:number) => {
        navigate({
            pathname: `/notice/read/${qno}`,
            search:`${queryStr}`
        })
    }
    const moveToAdd = () => {
        navigate({
            pathname: `/notice/add/`,
            search:`${queryStr}`
        })
    }

    useEffect(() => {
        setLoading(true);
        getBoardList(page, size).then((data) => {
            setPageResponse(data);
            setTimeout(() => {
                setLoading(false);
            }, 600);
        });
    }, [page, size]);

    const ListDiv =
        Array.isArray(pageResponse.dtoList) && pageResponse.dtoList.length > 0 ? (
            pageResponse.dtoList.map((qna:IBoard) => {
                const { bno, title, writer, regDate} = qna;
                return (
                    <div
                        key={bno}
                        onClick={() => moveToRead(bno)}
                        className="grid grid-cols-12 border border-b-0 border-gray-400 text-center text-xs text-gray-600 uppercase tracking-wider">
                        <div
                            className="col-span-2 h-full p-2 flex justify-center items-center border-r border-gray-400">
                            <span>{bno}</span>
                        </div>
                        <div
                            className="col-span-6 h-full p-2 flex justify-center items-center border-r border-gray-400">
                            <span>{title}</span>
                        </div>
                        <div
                            className="col-span-2 h-full p-2 flex justify-center items-center border-r border-gray-400">
                            <span>{writer}</span>
                        </div>
                        <div
                            className="col-span-2 h-full p-2 flex justify-center items-center border-r border-gray-400">
                            <span>{regDate}</span>
                        </div>
                    </div>
                );
            })
        ) : (
            <div>데이터가 없습니다.</div>
        );

    return (
        <>
            {loading && <LoadingComponent/>}

            <div className="w-full py-8">
                {/* grid table */}
                <div className=" px-4">
                    <div className="min-w-full leading-normal">
                        {/* table header */}
                        <div
                            className="grid grid-cols-12 h-15 border border-b-0 border-gray-400 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <div
                                className="col-span-2 p-2 flex justify-center items-center border-r border-gray-400">
                                <span>공지 번호</span>
                            </div>
                            <div
                                className="col-span-6 p-2 flex justify-center items-center border-r border-gray-400">
                                <span>제목</span>
                            </div>
                            <div
                                className="col-span-2 p-2 flex justify-center items-center border-r border-gray-400">
                                <span>작성자</span>
                            </div>
                            <div
                                className="col-span-2 p-2 flex justify-center items-center border-r border-gray-400">
                                <span>작성일</span>
                            </div>
                        </div>
                        {/* table body */}
                        <div className="overflow-y-auto">
                            {ListDiv}
                        </div>
                        {/* table footer */}
                        <div
                            className="grid grid-cols-12 h-15 p-3 border-t border-gray-400 text-center text-xs text-gray-600 uppercase tracking-wider">
                            <div className="col-span-12 flex justify-end">
                                <button
                                    onClick={moveToAdd}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 transition duration-200">
                                    등록
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PageComponent pageResponse={pageResponse}/>
        </>
    );
}

export default NoticeListComponent;