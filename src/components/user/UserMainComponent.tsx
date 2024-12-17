
import { Link } from "react-router-dom";

function UserMainComponent() {
    return (
        <Link
            to="/register"
            className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-8 py-4 text-lg sm:px-12 sm:py-6 sm:text-xl rounded hover:bg-blue-700 transition-colors duration-300"
        >
            등록하기
        </Link>
    );
}

export default UserMainComponent;
