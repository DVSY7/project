export default function ShowGalleryModal(props) {
    const { username, setClickedGallery } = props;

    const galleryTextLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <>
            <div
                className={`flex justify-center items-center fixed bg-black bg-opacity-50 w-screen h-screen left-0 top-0 z-20`}
            >
                <div className={`flex relative w-[60vw] h-[75vh] rounded-md bg-white bg-opacity-100`}>
                    <span
                        // 갤러리 모달 닫기 버튼
                        onClick={() => setClickedGallery(null)}
                        className={`absolute right-0 mr-2 text-[1.5rem] cursor-pointer text-gray-500 hover:text-black transition-colors duration-500`}>
                        {/* 닫기버튼 요소 */}
                        x
                    </span>
                    {/* 갤러리 이미지 영역 */}
                    <div className={`bg-red-100 w-[60%] rounded-l-md`}>1</div>
                    {/* 갤러리 본문 영역 */}
                    <div className={`w-[40%] rounded-r-md`}>
                        {/* 갤러리 제목 요소 */}
                        <div className={`h-[10%] flex items-center pl-4 border-b-[2px] border-gray-200`}>
                            {/* 갤러리 제목 프로필 */}
                            <img className={`w-[40px] h-[40px] mr-4`} src="images/미니프로필.png" alt="미니프로필"></img>
                            <span>{username}의 게시글</span>
                        </div>
                        {/* 갤러리 본문 요소 */}
                        <div className={`h-[32.5%] flex border-b-[2px] border-gray-200`}>
                            {/* 갤러리 본문 프로필 */}
                            <div className={`w-[15%] flex justify-center mt-4`}>
                                {/* 갤러리 본문 프로필 요소 */}
                                <img className={`w-[40px] h-[40px]`} src={`images/미니프로필.png`} alt="미니프로필"></img>
                            </div>
                            {/* 갤러리 본문 내용 및 태그 영역 */}
                            <div className={`w-[85%]`}>
                                {/* 갤러리 본문 내용 */}
                                <div className={`h-[87%] flex justify-center items-center text-[2rem]`}>Sample Text Data</div>
                                {/* 갤러리 본문 태그 */}
                                <div className={`h-[13%]`}>Sample Tags</div>
                            </div>

                        </div>
                        {/* 갤러리 댓글 영역 */}
                        <div className={`h-[37%] overflow-y-auto hide-scrollbar`}>
                            {galleryTextLength.map((_,idx) => {
                                return (
                                    <>
                                        <div className={`flex`}>
                                            {/* 갤러리 댓글 이미지 */}
                                            <div className={`w-[17%] flex justify-end pt-2 pr-2`}>
                                                <img className={`w-[40px] h-[40px]`} src={`images/미니프로필.png`} alt="미니프로필"></img>
                                            </div>
                                            {/* 갤러리 댓글 내용 */}
                                            <div className={`w-[70%] pl-2`}>
                                                {/* 갤러리 댓글 유저이름 */}
                                                <div className={`pt-1`}>Sample UserName{idx+1} <span className={`font-sans text-[0.8rem] ml-1`}>3시간</span></div>
                                                {/* 갤러리 댓글 본문 */}
                                                <div className={`pl-2`}>Sample Text Data</div>
                                                {/* 갤러리 댓글 답글달기 */}
                                                <div className={`text-[0.8rem]`}>답글달기</div>
                                            </div>
                                            {/* 갤러리 댓글 좋아요 */}
                                            <div className={`w-[13%] flex flex-col justify-center items-center font-sans`}>
                                                {/* 갤러리 댓글 좋아요 이미지 */}
                                                <img className={`w-[15px] h-[15px] mb-1`} src={`images/좋아요2.png`} alt="좋아요"></img>
                                                {/* 갤러리 댓글 좋아요 수 */}
                                                <span>2</span>
                                            </div>
                                        </div>

                                    </>
                                )
                            })}
                        </div>
                        {/* 갤러리 아이콘 영역 */}
                        <div className={`h-[13%] pl-4 font-sans font-bold text-[0.8rem] border-b-[2px] border-gray-200`}>
                            {/* 갤러리 아이콘 */}
                            <div className={`flex pt-6 pb-2`}>
                                <img className={`w-[15px] h-[15px] mr-4`} src={`images/좋아요2.png`} alt="좋아요"></img>
                                <img className={`w-[15px] h-[15px]`} src={`images/북마크3.png`} alt="북마크"></img>
                            </div>
                            {/* 갤러리 좋아요 수 */}
                            <div className={``}>좋아요 102개</div>
                            {/* 갤러리 좋아요 날짜 */}
                            <div className={`text-gray-400`}>3일 전</div>
                        </div>
                        {/* 갤러리 댓글 입력창 */}
                        <div className={`h-[7.5%] flex`}>
                            {/* 갤러리 댓글 인풋 영역 */}
                            <textarea className={`resize-none outline-none w-[85%] h-full pt-4 pl-4 `} placeholder="댓글을 입력해주세요."></textarea>
                            {/* 갤러리 댓글 게시버튼 */}
                            <div className={`w-[15%] flex justify-center items-center text-blue-500`}>게시</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}