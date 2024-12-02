import {ReactElement} from "react";
import {useSearchParams} from "react-router-dom";
import {IPageResponse} from "../../types/pageResponse.ts";



interface Props<E> {
    pageResponse:IPageResponse<E>
}

const makeArr = (from:number, to:number): number[] => {

    const arr:number[] = []

    for (let i = from; i <= to ; i++) {
        arr.push(i)
    }
    return arr
}

function PageComponent<E>({pageResponse}: Props<E>): ReactElement {

    const current: number = pageResponse.current
    const tempLast: number = Math.ceil(current / 10.0) * 10
    const startPage: number = tempLast - 9
    const endPage: number = startPage + pageResponse.totalPage -1
    const prev: boolean = pageResponse.prev
    const next: boolean = pageResponse.next

    const pageNums:number[] = makeArr(startPage, endPage)

    const [query, setQuery] = useSearchParams()

    const changePage = (pageNum: number) => {

        query.set("page", String(pageNum))
        setQuery(query)

    }

    const lis = pageNums.map(num => (
        <li
            className={`px-4 py-2 rounded-md text-sm font-medium 
            ${num === current ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
            transition-all duration-300 cursor-pointer shadow-sm`}
            key={num}
            onClick={() => changePage(num)}
        >
            {num}
        </li>
    ));

    return (
        <div className="flex justify-center items-center mt-8">
            <ul className="flex space-x-4">
                {prev && (
                    <li
                        className="flex items-center justify-center px-5 py-2 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer transition-all duration-300 shadow-sm"
                        key={startPage - 1}
                        onClick={() => changePage(startPage - 1)}
                    >
                        <span className="material-icons">← 이전</span>
                    </li>
                )}

                {lis}

                {next && (
                    <li
                        className="flex items-center justify-center px-5 py-2 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer transition-all duration-300 shadow-sm"
                        key={endPage + 1}
                        onClick={() => changePage(endPage + 1)}
                    >
                        <span className="material-icons">다음 →</span>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default PageComponent;