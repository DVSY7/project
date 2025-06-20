// src/componant/content/ui/showGalleryModal.js

import {useEffect, useRef, useState} from "react";
import { fetchComment, updateComment } from "../api/gallery";

export default function ShowGalleryModal(props) {
    const { username,setClickedGallery, galleryImage, galleryInfo, index, title, text, galleryID, userID } = props;


    // 입력한 댓글 상태관리
    const [commentText, setCommentText] = useState("");

    // 댓글 정보 상태관리
    const [comments, setComments] = useState([]);

    // 갤러리 이미지 컨트롤러 상태관리
    const [clickedImage, setClickedImage] = useState(0);    

    // 댓글 입력 시 화면을  스크롤
    const commentEndRef = useRef(null);

    // 댓글 불러오는 함수
    const getComment = async () =>{
            const res = await fetchComment(galleryID, userID);
            console.log("댓글정보 불러오기 실행중");
            setComments(res);
    }

    const handleClickByKey = (targetKey) => {
        const element = document.querySelector(`[data-key="${targetKey}"]`);
        if(element){
            element.click();
        }
    }

    // 디버깅을 위한 코드
    useEffect(()=>{
        console.log("현재 게시글 정보:",galleryInfo, {userInfo:{galleryID:galleryID, userID: userID}});
        console.log("현재 댓글정보:",comments);
    },[galleryInfo]);

    // 게시글 변경 시 댓글정보 불러오기
    useEffect(()=>{
        getComment();
    },[galleryInfo]);

    // 새로운 댓글 입력 시 스크롤 하는 트리거
    useEffect(()=>{
        if(commentEndRef.current){
            commentEndRef.current.scrollIntoView({behavior:"smooth"});
        }
    },[comments])

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
                    className={`flex justify-center items-center absolute top-0 left-[-32%] h-full w-[5%] z-20`}>
                        {/* 왼쪽이동 버튼 이미지 */}
                        <img className={`w-[40px] h-[40px] opacity-70 hover:opacity-100 transition-all duration-500`} src="images/왼쪽이동.png" alt="왼쪽이동"></img>
                    </div>
                    {/* 갤러리모달 오른쪽으로 이동버튼 */}
                    <div
                    onClick={() => {
                        setClickedGallery(index + 1);
                        handleClickByKey(index + 1);
                    }}
                    className={`flex justify-center items-center absolute top-0 right-[-32%] h-full w-[5%] z-20`}
                    >
                        {/* 오른쪽이동 버튼 이미지 */}
                        <img className={`w-[40px] h-[40px] opacity-70 hover:opacity-100 transition-all duration-500`} src="images/오른쪽이동.png" alt="오른쪽이동"></img>
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
                        <div className={`h-[10%] flex items-center pl-4 border-b-[1px] border-gray-200`}>
                            {/* 갤러리 제목 프로필 */}
                            <img className={`w-[40px] h-[40px] mr-4 rounded-[50%]`} src={`${galleryInfo.profile_image}`} alt="미니프로필"></img>
                            {/* <div><span className={`text-[0.9rem]`}>님의 게시글</span></div> */}
                            <span className={`font-bold`}>{username}</span>
                        </div>
                        {/* 갤러리 본문 요소 */}
                        <div className={`h-[32.5%] flex border-b-[1px] border-gray-200`}>
                            {/* 갤러리 본문 프로필 */}
                            <div className={`w-[15%] flex justify-center mt-4`}>
                                {/* 갤러리 본문 프로필 요소 */}
                                <img className={`w-[40px] h-[40px] rounded-[50%]`} src={`${galleryInfo.profile_image}`} alt="미니프로필"></img>
                            </div>
                            {/* 갤러리 본문 내용 및 태그 영역 */}
                            <div className={`w-[85%]`}>
                                {/* 갤러리 본문 제목 */}
                                <div className={`h-[25%] flex justify-start items-center text-[1.2rem] font-bold`}>{title}</div>
                                {/* 갤러리 본문 내용 */}
                                <div className={`h-[62%] w-[90%] overflow-auto hide-scrollbar whitespace-pre-line text-[0.8rem]`}>{text}</div>
                                {/* 갤러리 본문 태그 */}
                                <div className={`h-[13%] text-blue-500 font-sans text-[0.8rem]`}># Sample Tags</div>
                            </div>

                        </div>
                        {/* 갤러리 댓글 영역 */}
                        <div className={`h-[37%] overflow-y-auto hide-scrollbar`}>
                            {comments.map((comment,idx) => {
                                // 댓글의 마지막 체크
                                const isLast = idx === comments.length - 1;
                                return (
                                    <>                             
                                        <div className={`flex mt-2`} key={`${comment}${idx-1}`}>
                                            {/* 갤러리 댓글 이미지 */}
                                            <div className={`w-[17%] flex justify-end pt-1 pr-2`}>
                                                <img className={`w-[40px] h-[40px] rounded-[50%]`} src={`${comment.profile_image}`} alt="미니프로필"></img>
                                            </div>
                                            {/* 갤러리 댓글 내용 */}
                                            <div className={`w-[62%] pl-2`}>
                                                {/* 갤러리 댓글 유저이름 */}
                                                <div className={`pt-1 font-sans font-bold text-[0.9rem]`}>@{comment.name} <span className={`font-sans text-[0.8rem] ml-1`}>3시간</span></div>
                                                {/* 갤러리 댓글 본문 */}
                                                <div className={`pl-2 text-[0.8rem]`}>{comment.comment}</div>
                                                {/* 갤러리 댓글 답글달기 */}
                                                <div className={`text-[0.8rem] text-gray-400 hover:text-gray-600 cursor-pointer`}>답글달기</div>
                                            </div>
                                            {/* 갤러리 댓글 좋아요 */}
                                            <div className={`w-[13%] flex flex-col justify-center items-end font-sans`}>
                                                {/* 갤러리 댓글 좋아요 이미지 */}
                                                <img className={`w-[15px] h-[15px] mb-1`} src={`images/좋아요2.png`} alt="좋아요"></img>
                                                {/* 갤러리 댓글 좋아요 수 */}
                                                <span>{comment.likes}</span>
                                            </div>
                                        </div>  
                                        {isLast && <div ref={commentEndRef}></div>}                           
                                    </>
                                )
                            })}
                        </div>
                        {/* 갤러리 아이콘 영역 */}
                        <div className={`h-[13%] pl-4 font-sans font-bold text-[0.8rem] border-b-[1px] border-gray-200`}>
                            {/* 갤러리 아이콘 */}
                            <div className={`flex pt-6 pb-2`}>
                                <img onClick={()=>{galleryInfo.func();}} className={`w-[15px] h-[15px] mr-4 cursor-pointer`} src={`images/${galleryInfo.clickedLike? "좋아요1":"좋아요2"}.png`} alt="좋아요"></img>
                                <img className={`w-[15px] h-[15px]`} src={`images/북마크3.png`} alt="북마크"></img>
                            </div>
                            {/* 갤러리 좋아요 수 */}
                            <div className={``}>조회 {galleryInfo.views}회 좋아요 {galleryInfo.likes}개</div>
                            {/* 갤러리 좋아요 날짜 */}
                        </div>
                        {/* 갤러리 댓글 입력창 */}
                        <div className={`h-[7.5%] flex`}>
                            {/* 갤러리 댓글 인풋 영역 */}
                            <textarea
                                // ref={inputRef}
                                value={commentText}
                                onKeyDown={ async (e)=> {
                                    if(e.key === "Enter" && e.shiftKey){
                                        console.log("줄바꿈 실행");
                                    }else if(e.key === "Enter"){
                                        e.preventDefault();
                                        // 댓글 정보를 상태에 저장
                                        setCommentText(e.target.value);
                                        // 댓글을 데이터베이스에 저장
                                        await updateComment(galleryID,userID,commentText);
                                        // 댓글 정보 최신화
                                        await getComment();
                                        // 댓글 입력 창 초기화
                                        setCommentText("");
                                    }
                                }}
                                onChange={(e)=>{setCommentText(e.target.value)}} 
                                className={`resize-none outline-none w-[85%] h-full pt-4 pl-4`} 
                                placeholder="댓글을 입력해주세요.">
                            </textarea>
                            {/* 갤러리 댓글 게시버튼 */}
                            <div 
                                className={`w-[15%] flex justify-center items-center text-blue-300 hover:text-blue-500 cursor-pointer transition-all duration-300`}>게시
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}