import {createBrowserRouter, Navigate} from "react-router-dom";
import {lazy, Suspense} from "react";
import noticeRouter from "./noticeRouter.tsx";


const LoadingPage = lazy(() => import("../pages/LoadingPage.tsx"))
const LoginPage = lazy(() => import("../pages/AdminLoginPage.tsx"))
const RegisterPage = lazy(() => import("../pages/RegisterPage.tsx"))
const AuthCheckPage = lazy(() => import("../pages/AuthCheckPage.tsx"))
const ApplierIndex = lazy(() => import("../pages/applier/ApplierIndex.tsx"))
const ApplierListPage = lazy(() => import("../pages/applier/ApplierListPage.tsx"))
const ApplierReadPage = lazy(() => import("../pages/applier/ApplierReadPage.tsx"))
const ApplierMainPage = lazy(() => import("../pages/ApplierMainPage.tsx"))

export const Loading = <LoadingPage></LoadingPage>

const mainRouter = createBrowserRouter([
    {
        path: "",
        element: <Navigate to="login" replace={true}/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/auth/:ano",
        element: <Suspense fallback={Loading}><AuthCheckPage/></Suspense>
    },
    {
        path:"/main",
        element: <Suspense fallback={Loading}><ApplierMainPage/></Suspense>
    },
    {
        path: "/register",
        element: <Suspense fallback={Loading}><RegisterPage/></Suspense>
    },
    {
        path: "/applier",
        element: <Suspense fallback={Loading}><ApplierIndex/></Suspense>,
        children:[
            {
                path: "",
                element: <Navigate to="list" replace={true}></Navigate>
            },
            {
                path:"list",
                element: <Suspense fallback={Loading}><ApplierListPage/></Suspense>
            },
            {
                path:"read/:ano",
                element: <Suspense fallback={Loading}><ApplierReadPage/></Suspense>
            }
        ]
    },
    noticeRouter

])

export default mainRouter