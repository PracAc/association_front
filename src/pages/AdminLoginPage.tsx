import LoginComponent from "../components/admin/login/LoginComponent.tsx";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {useAppSelector} from "../hooks/rtk.ts";


function AdminLoginPage() {
    const loginInfo = useAppSelector((state) => state.signin); // 리덕스에서 login 상태 가져오기
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (loginInfo.adminId) {
            setIsRedirecting(true); // 로그인된 경우 리디렉션 플래그를 true로 설정
        }
    }, [loginInfo]); // login 전체를 의존성 배열에 넣어 상태 변경을 감지

    if (isRedirecting) {
        return <Navigate to="/admin/applier" replace={true} />; // 리디렉션 처리
    }

    return (

        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <LoginComponent />
        </div>
    );
}

export default AdminLoginPage;