import {useState} from "react";
import Depth2Menu from "./Depth2Menu.tsx";

interface subMenusProps {
    name: string;
    toPath: string;
}

interface Depth1MenuProps {
    mainName: string;
    subMenus: subMenusProps[];
    basicPath: string;
    iconName: string;
}

const ChevronDownIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const ChevronUpIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
);

function Depth1Menu({ mainName, subMenus, basicPath, iconName }: Depth1MenuProps) {
    const [isToggle, setIsToggle] = useState(false);

    // const iconPath = `/src/assets/img/icons/${iconName}`;
    const iconPath = `https://www.busosi.com/assets/img/icons/${iconName}`;


    return (
        <li className="relative px-4 py-3">
            <button
                onClick={() => setIsToggle(!isToggle)}
                className="flex items-center justify-between w-full text-base font-semibold text-gray-700 hover:text-blue-700 transition-colors duration-300"
            >
                <div className="flex items-center">
                    <img src={iconPath} alt={`${mainName} Icon`} className="w-6 h-6 mr-3" />
                    <span>{mainName}</span>
                </div>
                <div className="transition-transform duration-200">
                    {isToggle ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </div>
            </button>
            {isToggle && <Depth2Menu subMenus={subMenus} basicPath={basicPath} />}
        </li>
    );
}

export default Depth1Menu;
