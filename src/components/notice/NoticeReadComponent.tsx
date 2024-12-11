import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import LoadingComponent from "../common/LoadingComponent.tsx";
import {IBoardReadWithReview} from "../../types/iboard.ts";
import {deleteBoard, getBoardRead, putBoardEdit} from "../../apis/boardAPI.ts";


const initialRead: IBoardReadWithReview = {
    title: "",
    content: "",
    writer: "",
    regDate: "",
    attachFileNames: [],
    reviewList: []
};

function NoticeReadComponent() {
    // uri 작성글 번호
    const {bno} = useParams();
    // uri 상 page, size
    const [query] = useSearchParams();
    const navigate = useNavigate();
    const queryStr = new URLSearchParams(query).toString();

    // input file value Ref
    const filesRef = useRef<HTMLInputElement>(null)
    // 삭제할 파일 목록
    const [deleteFileNames, setDeleteFileNames] = useState<string[]>([]);

    // 로딩 상태
    const [loading, setLoading] = useState<boolean>(false);
    // 작성글 편집 모드 상태
    const [isBoardEditing, setIsBoardEditing] = useState<boolean>(false);
    // 작성글 + 답글 상태
    const [board, setBoard] = useState<IBoardReadWithReview>(initialRead);
    // 작성글 삭제클릭 확인 상태
    const [deleteChk, setDeleteChk] = useState(false);
    // 수정할 작성글 제목
    const [boardEditTitle, setBoardEditTitle] = useState(board.title);
    // 수정할 작성글 내용
    const [boardEditContent, setBoardEditContent] = useState(board.content);
    // 알림 모달 상태
    const [modalOpen, setModalOpen] = useState(false);
    // 알림 모달 메시지
    const [modalMessage, setModalMessage] = useState("");

    // 리스트 목록 이동
    const handleMoveToList = () => {
        navigate(`/notice/list?${queryStr}`);
    };
    // 게시글 편집 모드 활성화
    const handleBoardEditClick = () => {
        // 삭제할 이미지 목록 초기화
        setDeleteFileNames([]);
        // 편집 모드 상태 활성화
        setIsBoardEditing(true);
    };
    // 게시글 편집 모드 비활성화
    const handleBoardEditCancelClick = () => {
        // 기존 이미지 목록 되돌리는 set 처리
        setBoard({...board, attachFileNames: [...board.attachFileNames, ...deleteFileNames],});
        // 삭제할 이미지 목록 초기화
        setDeleteFileNames([]);
        // 편집 모드 상태 비활성화
        setIsBoardEditing(false);
    };
    // 게시글 수정 처리
    const handleBoardModifyClick = () => {
        // 새로운 파일
        const newFiles = filesRef?.current?.files
        // formData 생성
        const formData: FormData = new FormData()

        // 기존 파일 이름 formData 추가
        if (board.attachFileNames){
            for (let i = 0; i < board.attachFileNames.length; i++) {
                formData.append("attachFileNames", board.attachFileNames[i]);
            }
        }
        // 신규 파일 목록 formData 추가
        if(newFiles) {
            for (let i = 0; i < newFiles.length; i++) {
                formData.append("files", newFiles[i])
            }
            console.log(newFiles);
        }
        // 삭제할 파일 이름 formData 추가
        if (deleteFileNames) {
            for (let i = 0; i < deleteFileNames.length; i++) {
                formData.append("deleteFileNames", deleteFileNames[i])
                console.log(deleteFileNames[i])
            }
        }
        // 수정된 title, content 를 formData 추가
        formData.append("title", boardEditTitle)
        formData.append("content", boardEditContent)

        // API 호출 ( put 처리)
        putBoardEdit(Number(bno), formData)
            .then((data) => {
                setModalMessage(`번호 ${data}가 수정이 완료되었습니다.`); // 성공 메시지
                setModalOpen(true); // 알림 모달 종료
            })
            .catch(() => {
                setModalMessage("수정에 실패했습니다."); // 실패 메시지
                setModalOpen(true); // 알림 모달 종료
            });

    };
    // 게시글 삭제 처리
    const handleBoardDeleteClick = () => {
        // API 호출 ( Soft Delete 처리 )
        deleteBoard(Number(bno))
            .then((data) => {
                setModalMessage(`번호 ${data}가 삭제가 완료되었습니다.`); // 성공 메시지
                setModalOpen(true); // 알림 모달 종료
                setDeleteChk(true); // list 이동을 위한 상태변경
            })
            .catch(() => {
                setModalMessage("삭제를 실패했습니다."); // 실패 메시지
                setModalOpen(true); // 알림 모달 종료
            });
    }
    // 알림 모달 닫기
    const closeModal = () => {
        setIsBoardEditing(false); // 편집 모드 종료
        setModalOpen(false) // 알림 모달 종료

        // 알림 모달 종료시 삭제 체크에 따른 list 이동 처리
        if (deleteChk) {
           return handleMoveToList()
        }
    };

    useEffect(() => {
        setLoading(true);
        getBoardRead(Number(bno)).then((data) => {
            setBoard(data);
            setBoardEditTitle(data.title); // 초기값 설정
            setBoardEditContent(data.content); // 초기값 설정
            console.log(data.attachFileNames)
            setTimeout(() => {
                setLoading(false);
            }, 600);
        });
    }, [bno, modalOpen]);

    // 이미지 파일 삭제 처리 ( 화면에서만 처리 )
    const handleImageDelete = (fileName: string) => {
        // 기존 attachFileNames 수정을 위한 filter 처리
        const updatedImages = board.attachFileNames.filter(name => name !== fileName);
        // 삭제한 이미지 화면에서 제거
        setBoard({ ...board, attachFileNames: updatedImages });
        //삭제할 파일추가
        setDeleteFileNames([...deleteFileNames, fileName]);
    };

    // 이미지 div 목록
    const imgDivs = board.attachFileNames.map((fileName) => (
        <div key={fileName} className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <img
                // S3 처리 필요 서버에서 get메서드를 통한 호출처리
                // src={`http://localhost:8080/api/board/img/${fileName}`}
                src={`https://s3.ap-northeast-2.amazonaws.com/oz-wizard-bucket/board/${fileName}`}
                alt=""
                className="w-full h-48 object-cover rounded-lg border border-gray-300"
            />
            {isBoardEditing && <button
                onClick={() => handleImageDelete(fileName)}
                className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition duration-200"
            >
                삭제
            </button>}
        </div>
    ));


    return (
        <div className="pt-5 pb-5 w-full mx-auto">
            {loading && <LoadingComponent/>}
            <div className="px-4 space-y-6">
                <div className="border-b border-gray-200 pb-4">
                    <span className="text-2xl font-semibold text-gray-800">제목</span>
                    {isBoardEditing ? (
                        <input
                            className="mt-1 w-full p-2 border border-black text-gray-700"
                            value={boardEditTitle}
                            onChange={(e) => setBoardEditTitle(e.target.value)}
                        />
                    ) : (
                        <p className="mt-1 w-full p-2 border border-opacity-0 text-gray-700">{board.title}</p>
                    )}
                </div>
                <div className="border-b border-gray-200 pb-4">
                    <span className="text-xl font-semibold text-gray-800">작성자</span>
                    <p className="mt-1 w-full p-2 text-gray-700">{board.writer}</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                    <span className="text-xl font-semibold text-gray-800">작성일</span>
                    <p className="mt-1 w-full p-2 text-gray-700">{board.regDate}</p>
                </div>
                <div className="flex flex-col">
                    <label className="text-xl font-semibold text-gray-800">내용</label>
                    {isBoardEditing ? (
                        <textarea
                            className="mt-2 min-h-80 text-gray-700 px-4 py-3 border border-black break-words"
                            value={boardEditContent}
                            onChange={(e) => setBoardEditContent(e.target.value)}
                        />
                    ) : (
                        <div className="mt-2 min-h-80 text-gray-700 px-4 py-3 border border-gray-300 break-words">
                            {board.content}
                        </div>
                    )}
                </div>
                {isBoardEditing && <div className="flex flex-col border-b border-gray-200 pb-4">
                    <label className="text-xl font-semibold text-gray-800">첨부파일</label>
                    <input type="file" ref={filesRef} multiple={true}/>
                </div>}
                {imgDivs && <div className="flex flex-wrap -m-2">{imgDivs}</div>}


                <div className="flex gap-4 mt-6 justify-between">
                    <button
                        onClick={handleMoveToList}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 transition duration-200"
                    >
                        목록
                    </button>
                    <div className="flex gap-3">
                        {isBoardEditing ? (
                            <button
                                onClick={handleBoardModifyClick}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 transition duration-200"
                            >
                                저장
                            </button>
                        ) : (
                            <button
                                onClick={handleBoardEditClick}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition duration-200"
                            >
                                수정
                            </button>
                        )}
                        {isBoardEditing ? (
                            <button
                                onClick={handleBoardEditCancelClick}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 transition duration-200"
                            >
                                취소
                            </button>
                        ) : (
                            <button
                                onClick={handleBoardDeleteClick}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50 transition duration-200"
                            >
                                삭제
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 알림 모달 */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="flex flex-col justify-center bg-white p-8 rounded-lg shadow-lg">
                        <p className="text-xl">{modalMessage}</p>
                        <button
                            onClick={closeModal}
                            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50 transition duration-200"
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NoticeReadComponent;
