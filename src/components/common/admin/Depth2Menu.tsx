import { Link } from "react-router-dom";

interface subMenusProps {
    name: string;
    toPath: string;
}

interface Depth2MenuProps {
    subMenus: subMenusProps[];
    basicPath: string;
}

function Depth2Menu({ subMenus, basicPath }: Depth2MenuProps) {
    return (
        <ul className="mt-2 space-y-2 rounded-lg bg-white shadow-lg border border-gray-200">
            {subMenus.map((menuName, idx) => {
                const fullPath = basicPath + menuName.toPath;
                return (
                    <li key={idx}>
                        <Link
                            to={fullPath}
                            className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-800 transition-colors duration-300 rounded-md"
                        >
                            {menuName.name}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default Depth2Menu;
