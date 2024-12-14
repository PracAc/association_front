import Depth1Menu from "./Depth1Menu.tsx";
import {useAppSelector} from "../../../hooks/rtk.ts";

function AsideMenuComponent() {
    const menus = [
        {
            mainName: "신청관리",
            subMenus: [{ name: "신청목록", toPath: "/list" }],
            basicPath: "/admin/applier",
            iconName: "users.png",
        }
    ];

    const adminName = useAppSelector((state) => state.signin.adminName);
    console.log(adminName)

    return (
        <aside className="z-20 hidden w-64 bg-gray-100 md:block flex-shrink-0 border-r border-gray-200 shadow-sm">
            <div className="flex flex-col gap-4 py-6 text-center">
                <img src="/src/assets/img/logo.png" alt=""/>
                <span className="block text-lg font-bold text-blue-600">관리자 페이지</span>
                <div className="flex flex-col items-center gap-2">
                    <img className="rounded-full w-24 h-24" src="/src/assets/img/defaultUser.jpg" alt="기본 유저이미지"/>
                    <span>관리자 <span className="font-semibold">{adminName}</span> 님</span>
                </div>
            </div>
            <ul className="px-4 space-y-2">
                {menus.map((menu, index) => (
                    <Depth1Menu key={index} {...menu} />
                ))}
            </ul>
        </aside>
    );
}

export default AsideMenuComponent;
