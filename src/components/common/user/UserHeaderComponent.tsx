import { Link } from "react-router-dom";
import logo from "../../../assets/img/logo.png"

function UserHeaderComponent() {
    return (
        <header className="bg-transparent fixed z-10 flex items-center justify-between px-6 py-6">
            <div className="flex items-center space-x-4">
                {/* Logo 이미지 */}
                <Link to="/main">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-36 h-12 "
                    />
                </Link>
            </div>
        </header>
    );
}

export default UserHeaderComponent;