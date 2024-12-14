import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';
import {Link} from "react-router-dom";
import logo from "../../../assets/img/logo.png"

function UserMainFooterComponent() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-8">
            {/* 푸터 상단 로고 및 사업자 정보 */}
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* 로고 - 좌측 최상단 */}
                <div className="flex-shrink-0 mb-4 md:mb-0">
                    <Link to="/main">
                        <img src={logo} alt="부산 지역아티스트 협회 로고" className="w-[20rem]" />
                    </Link>
                </div>

                {/* 사업자 정보 - 우측 배치 */}
                <div className="text-center md:text-right space-y-2">
                    <p>사단법인 부산 지역아티스트 협회</p>
                    <p>대표: 홍길동 | 주소: 부산 해운대구 신세계 스파로스</p>
                    <p>대표전화: 010-1234-5678 | E-mail: dongdonge@gmail.com</p>
                    <p>사업자등록번호: 123-45-67890</p>
                    <p>호스팅 제공자: 주식회사 맑은소프트웨어</p>
                </div>
            </div>

            {/* SNS 아이콘 */}
            <div className="mt-8 flex justify-center space-x-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <FaFacebook size={28} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <FaTwitter size={28} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <FaInstagram size={28} />
                </a>
                <a href="https://github.com/PracAc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                    <FaGithub size={28} />
                </a>
            </div>

            {/* Copyright */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
                <p>Copyright © 2020 부산 아티스트협회. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default UserMainFooterComponent;
