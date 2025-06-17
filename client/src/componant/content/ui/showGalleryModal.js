// src/componant/content/ui/showGalleryModal.js

import {useState} from "react";

export default function ShowGalleryModal(props) {
    const { username,setClickedGallery, galleryImage, index, title } = props;

    const galleryTextLength = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // 갤러리 이미지 컨트롤러 상태관리
    const [clickedImage, setClickedImage] = useState(0);

    const handleClickByKey = (targetKey) => {
        const element = document.querySelector(`[data-key="${targetKey}"]`);
        if(element){
            element.click();
        }
    }


    if(!galleryImage || galleryImage.length === 0) {
        return null; // 갤러리 이미지가 없으면 모달을 렌더링하지 않음
    }

    return (
        <>
            <div key={username}
                className={`flex justify-center items-center fixed bg-black bg-opacity-50 w-screen h-screen left-0 top-0 z-20`}
            >
                <div className={`flex relative w-[60vw] h-[75vh] rounded-md bg-white bg-opacity-100`}>
                    {/* 갤러리모달 왼쪽으로 이동버튼 */}
                    <div 
                    onClick={() => {
                        setClickedGallery(index - 1);
                        handleClickByKey(index - 1);
                    }}
                    className={`flex justify-center items-center absolute bg-white opacity-0 hover:opacity-50 top-0 left-0 h-full w-[5%] z-20 transition-all duration-500`}>
                        {/* 왼쪽이동 버튼 이미지 */}
                        <img className={`w-[50px] h-[50px]`} src="images/왼쪽이동.png" alt="왼쪽이동"></img>
                    </div>
                    {/* 갤러리모달 오른쪽으로 이동버튼 */}
                    <div
                    onClick={() => {
                        setClickedGallery(index + 1);
                        handleClickByKey(index + 1);
                    }}
                    className={`flex justify-center items-center absolute bg-black opacity-0 hover:opacity-50 top-0 right-0 h-full w-[5%] z-18 transition-all duration-500`}
                    >
                        {/* 오른쪽이동 버튼 이미지 */}
                        <img className={`w-[50px] h-[50px]`} src="images/오른쪽이동.png" alt="오른쪽이동"></img>
                    </div>
                    <span
                        // 갤러리 모달 닫기 버튼
                        onClick={() => setClickedGallery(null)}
                        className={`flex justify-end absolute right-0 mr-2 text-[1.5rem] h-[60px] w-[50px] cursor-pointer text-gray-500 hover:text-black transition-colors duration-500`}>
                        {/* 닫기버튼 요소 */}
                        X
                    </span>
                    {/* 갤러리 이미지 영역 */}
                    <div className={`relative w-[60%] rounded-l-md`}>
                        {/* 갤러리 이미지 */}
                        <img
                        // 이미지를 눌러도 다음이미지로 넘어가도록 설정 
                        onClick={() => {
                            // 이미지를 누르면 현재이미지 인덱스 + 1 마지막 이미지로 넘어가면 처음이미지로 돌아가도록 설정
                            clickedImage < galleryImage.length - 1 ? setClickedImage(clickedImage + 1) : setClickedImage(0);
                        }}
                        className={`opacity-100 w-full h-full rounded-l-md cursor-pointer transition-opacity duration-500`} src={`${galleryImage[clickedImage].image_url}`} alt="갤러리이미지"></img>
                        {/* 갤러리 이미지 컨트롤러 */}
                        <div className={`absolute bottom-4 w-full h-[50px] flex justify-center items-center `}>
                            {/* 갤러리 이미지 컨트롤러 버튼 */}
                            {galleryImage.map((_,idx) => (
                                <div
                                key={idx} 
                                onClick={() => {
                                    setClickedImage(idx);
                                }}
                                className={`mx-2 ${clickedImage === idx ? "opacity-100" : "opacity-50"} hover:opacity-100 cursor-pointer transition-opacity duration-500 text-white text-[1.5rem]`}>
                                    ●
                                </div>
                            ))}
                        </div>
                    </div>
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
                                {/* 갤러리 본문 제목 */}
                                <div className={`h-[25%] flex justify-center items-center text-[2rem]`}>{title}</div>
                                {/* 갤러리 본문 내용 */}
                                <div className={`h-[62%]`}>123</div>
                                {/* 갤러리 본문 태그 */}
                                <div className={`h-[13%]`}>Sample Tags</div>
                            </div>

                        </div>
                        {/* 갤러리 댓글 영역 */}
                        <div className={`h-[37%] overflow-y-auto hide-scrollbar`}>
                            {galleryTextLength.map((_,idx) => {
                                return (                             
                                    <div className={`flex`} key={idx}>
                                        {/* 갤러리 댓글 이미지 */}
                                        <div className={`w-[17%] flex justify-end pt-2 pr-2`}>
                                            <img className={`w-[40px] h-[40px]`} src={`images/미니프로필.png`} alt="미니프로필"></img>
                                        </div>
                                        {/* 갤러리 댓글 내용 */}
                                        <div className={`w-[60%] pl-2`}>
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