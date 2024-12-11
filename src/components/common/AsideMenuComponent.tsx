import { Link } from "react-router-dom";
import Depth1Menu from "./Depth1Menu.tsx";

function AsideMenuComponent() {
    const menus = [
        {
            mainName: "신청관리",
            subMenus: [{ name: "신청목록", toPath: "/list" }],
            basicPath: "/applier",
            iconName: "users.png",
        },
        {
            mainName: "공지 관리",
            subMenus: [
                { name: "공지 목록", toPath: "/list" },
            ],
            basicPath: "/notice",
            iconName: "category.png",
        },
    ];

    return (
        <aside className="z-20 hidden w-64 bg-gray-100 md:block flex-shrink-0 border-r border-gray-200 shadow-sm">
            <div className="py-6 text-center">
                <Link
                    to="/applier/list"
                    className="block text-lg font-bold text-blue-800 hover:text-blue-600"
                >
                    협회 관리자
                </Link>
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
