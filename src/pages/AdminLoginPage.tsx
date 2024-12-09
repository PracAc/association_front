import SigninComponent from "../components/adminlogin/SigninComponent.tsx";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {useAppSelector} from "../hooks/rtk.ts";

function AdminLoginPage() {
    const loginInfo = useAppSelector((state) => state.signin); // 리덕스에서 adminlogin 상태 가져오기
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
        if (loginInfo.adminId) {
            setIsRedirecting(true); // 로그인된 경우 리디렉션 플래그를 true로 설정
        }
    }, [loginInfo]); // adminlogin 전체를 의존성 배열에 넣어 상태 변경을 감지

    if (isRedirecting) {
        return <Navigate to="/applier/list" replace />; // 리디렉션 처리
    }

    return (
        <div className="justify-center h-full">
            <SigninComponent />
        </div>
    );
}

export default AdminLoginPage;