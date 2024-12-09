import {Link} from "react-router-dom";
import Depth1Menu from "./Depth1Menu.tsx";

interface subMenusProps {
    name: string,
    toPath: string
}

interface Depth1MenuProps {
    mainName: string,
    subMenus: subMenusProps[],
    basicPath: string,
    iconName: string
}

function AsideMenuComponent() {

    const m1: Depth1MenuProps = {
        mainName: "신청관리",
        subMenus: [
            {name: "신청목록", toPath: "/list"}
        ],
        basicPath: "/applier",
        iconName: "users.png"
    }


    return (
        <aside className="z-20 hidden w-64 overflow-y-auto bg-side-navy md:block flex-shrink-0">
            <div className="py-4 text-neutral-800">

                {/* 로고 부분 */}
                <Link to="/applier/list" className="flex items-center justify-center mb-4 p-2">
                       <span className="flex items-center justify-center text-lg font-semibold">
                          협회 관리자
                       </span>
                </Link>

                {/* 1Depth 메뉴 */}
                <ul className="mt-6 space-y-2 text-txt-grey">
                    <Depth1Menu {...m1}></Depth1Menu>
                </ul>
            </div>
        </aside>
    );
}

export default AsideMenuComponent;