
import {useNavigate, useSearchParams} from "react-router-dom";
import {useRef, useState} from "react";
import {postBoardAdd} from "../../apis/boardAPI.ts";


function NoticeAddComponent() {

    const [query] = useSearchParams();
    const navigate = useNavigate();
    const queryStr = new URLSearchParams(query).toString();
    const [title, setTitle] = useState("");
    const [writer, setWriter] = useState("");
    const [content, setContent] = useState("");

    const [modalOpen, setModalOpen] = useState(false); // 모달 상태
    const [modalMessage, setModalMessage] = useState(""); // 모달 메시지

    const filesRef = useRef<HTMLInputElement>(null)

    const handleMoveToList = () => {
        navigate(`/notice/list?${queryStr}`);
    }

    const handleClickSubmit = () => {
        const files = filesRef?.current?.files

        const formData:FormData = new FormData()

        if(files) {
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i])
                console.log(files[i]);
            }
        }
        formData.append("title", title)
        formData.append("writer", writer)
        formData.append("content", content)
        formData.append("btype", `${1}`) // 게시판 타입 번호

        postBoardAdd(formData)
            .then((data) => {
                setModalMessage(`둥록번호 ${data}가 등록이 완료되었습니다.`); // 성공 메시지
                setModalOpen(true);
            })
            .catch(() => {
                setModalMessage("등록에 실패했습니다."); // 실패 메시지
                setModalOpen(true);
            });
    };

    const closeModal = () => {
        setModalOpen(false);
        navigate(`/notice/list`);
    };

    return (
        <div className="pt-5 pb-5 w-full mx-auto">

            <div className="px-4 space-y-6">
                <div className="border-b border-gray-200 pb-4">
                    <span className="text-2xl font-semibold text-gray-800">제목</span>
                    <input className="mt-1 w-full p-2 border border-black text-gray-700" value={title}
                           onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="border-b border-gray-200 pb-4">
                    <span className="text-xl font-semibold text-gray-800">작성자</span>
                    <input className="mt-1 w-full p-2 border border-black text-gray-700" value={writer}
                           onChange={(e) => setWriter(e.target.value)}/>
                </div>
                <div className="flex flex-col min-h-80">
                    <label className="text-xl font-semibold text-gray-800">내용</label>
                    <textarea className="mt-2 text-gray-700 px-4 py-3 border border-gray-300 break-words"
                              value={content}
                              onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div className="flex flex-col border-b border-gray-200 pb-4">
                    <label className="text-xl font-semibold text-gray-800">첨부파일</label>
                    <input type="file" ref={filesRef} multiple={true}/>
                </div>

                <div className="flex gap-4 mt-6 justify-center">
                    <button
                        onClick={handleMoveToList}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 transition duration-200">
                        목록
                    </button>
                    <button
                        onClick={handleClickSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition duration-200">
                        등록
                    </button>
                </div>
            </div>

            {modalOpen && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                    style={{ zIndex: 1000 }}
                >
                    <div className="flex flex-col justify-center bg-white p-8 rounded-lg shadow-lg">
                        <p className="text-xl">{modalMessage}</p>
                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default NoticeAddComponent;