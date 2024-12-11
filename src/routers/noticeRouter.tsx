import {Navigate} from "react-router-dom";
import {lazy, Suspense} from "react";
import LoadingPage from "../pages/LoadingPage.tsx";


const NoticeListPage = lazy(() => import("../pages/notice/NoticeListPage.tsx"));
const NoticeReadPage = lazy(() => import("../pages/notice/NoticeReadPage.tsx"));
const NoticeAddPage = lazy(() => import("../pages/notice/NoticeAddPage.tsx"));

const noticeRouter = {
    path: "/notice",
    children: [
        {
            path: "",
            element: <Navigate to="list" replace={true}/>
        },
        {
            path: "list",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <NoticeListPage />
                </Suspense>
            ),
        },
        {
            path: "read/:bno",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <NoticeReadPage />
                </Suspense>
            ),
        },
        {
            path: "add",
            element: (
                <Suspense fallback={<LoadingPage />}>
                    <NoticeAddPage />
                </Suspense>
            ),
        }

    ]
}

export default noticeRouter