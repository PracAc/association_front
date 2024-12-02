
import {useDaumPostcodePopup} from "react-daum-postcode";
import React from "react";


const Postcode = () => {
    const open = useDaumPostcodePopup();

    const handleComplete = (data) => {
        console.log(data)
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <button className="min-w-fit" type='button' onClick={handleClick}>
            Open
        </button>
    );
};

function RegisterComponent() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-4xl w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-4">협회 가입 신청</h2>
                <form className="space-y-4">
                    {/* 사업자 번호 */}
                    <div>
                        <label htmlFor="businessNumber" className="block text-sm font-medium text-gray-700">
                            사업자 번호
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                id="businessNumber"
                                name="businessNumber"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="사업자 번호를 입력하세요"
                                required
                            />
                            <button className="min-w-fit">
                                번호 인증
                            </button>
                        </div>
                    </div>

                    {/* 이름 */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            이름
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="이름을 입력하세요"
                            required
                        />
                    </div>

                    {/* 이메일 */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            이메일
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="이메일을 입력하세요"
                            required
                        />
                    </div>

                    {/* 주소 */}
                    <div>
                        <div>
                            {/* 우편번호 */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">우편번호</label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="우편번호"
                                        disabled
                                    />
                                    {/* 주소 검색 버튼 */}
                                    <Postcode/>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">주소</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="주소를 입력하세요"
                                    disabled // 검색된 주소를 수정할 수 없도록 비활성화
                                />
                            </div>

                            {/* 추가 주소 */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">상세 주소</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="상세 주소를 입력하세요"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 첨부파일 */}
                    <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                            첨부파일
                        </label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* 제출 버튼 */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                        >
                            제출
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterComponent;
