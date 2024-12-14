

function MainFooterComponent() {
    return (
        <>
            {/* 하단 푸터 */}
            <footer className="w-full bg-black-900 text-black text-sm py-4">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                    <div className="order-last mt-4 md:order-first md:mt-0">
                        <p>사단법인 한국안전보건협회</p>
                        <p>팀장: 김민재 | 주소: 부산 해운대구 신세계 스파로스</p>
                        <p>대표전화: 010-1234-56789 | E-mail: dongdonge@gmail.com</p>
                        <p>사업자등록번호: 123-45-67890 | 통신판매업신고: 제 2024-부산-1234 호</p>
                        <p>호스팅 제공자: 주식회사 맑은소프트웨어</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <p>Copyright © 2020 부산 아티스트협회. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default MainFooterComponent;