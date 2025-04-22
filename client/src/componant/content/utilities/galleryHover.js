//src/componant/content/utilities/galleryHover.js

import { useState } from "react";

export default function GalleryHover(props) {
    // props로 전달받은 객체
    const { info } = props;
    // 갤러리 날짜상태 관리 스테이트
    const [date, setDate] = useState("");
    const [clicked, setClicked] = useState(false);
    return (
        <>
            {/* 갤러리 호버 헤더 */}
            <div className={`flex flex-col h-[25%]`}>
                {/* 날짜와 비공개 설정 영역 */}
                <div className={`flex justify-between items-center font-sans mt-2 `}>
                    {/* 날짜 표기 영역 */}
                    <div className={`text-[1rem] ml-4`}>2025-08-09</div>
                    {/* 비공개설정 UI 영역 */}
                    <div className={`w-[40px] h-[13px] bg-gray-50 rounded-2xl mr-4 `}><div onClick={() => setClicked(clicked ? false : true)} className={`${clicked ? "translate-x-[63%] clicked-before" : ""}  transition-transform duration-500 w-full h-full galleryhover-before`}></div></div>
                </div>
                {/* 도구탭 영역 */}
                <div className={`flex justify-between `}>
                    {/* 도구 이미지 영역 */}
                    <div className={`flex ml-4 mt-1`}>
                        <img className={`w-[20px] h-[20px] mr-3`} src="/images/휴지통.png"></img>
                        <img className={`w-[20px] h-[20px] mr-3`} src="/images/연필.png"></img>
                        <img className={`w-[20px] h-[20px] mr-3`} src="/images/위치.png"></img>
                    </div>
                    {/* 비공개 글자 영역 */}
                    <div className={`mr-4 text-[0.75rem]`}>{clicked ? "공개" : "비공개"}</div>
                </div>
            </div>


            {/* 갤러리 호버 컨텐츠 */}
            <div className={` flex justify-center items-center w-full h-[50%] text-[1.5rem] px-4`}>
                <div>샐러드만드는 남자 어때요?</div>
            </div>



            {/* 갤러리 호버 풋터 */}
            <div className={` h-[25%] w-full flex justify-between items-end pb-2`}>
                {/* 갤러리 프로필 이미지 영역 */}
                <div className={`w-[42px] h-[42px] ml-3 mb-1`}><img src="/images/미니프로필.png"></img></div>
                {/* 조회수 좋아요 표시 영역 */}
                <div className={`flex mx-4 font-sans`}>
                    {/* 눈 이미지 영역 */}
                    <span>
                        {/* 눈 이미지 요소*/}
                        <img 
                        src="/images/눈.png"
                        className={`w-[20px] h-[20px] mr-2`}
                        ></img>
                    </span>
                    {/* 조회수 표시 */}
                    <span className={`mr-2 text-[0.75rem]`}>500</span>
                    {/* 하트 이미지 영역 */}
                    <span className={`flex justify-center items-center mr-2`}>
                        {/* 하트 이미지 요소 */}
                        <img 
                        src="/images/하트.png"
                        className={`w-[15px] h-[15px]`}
                        ></img>
                    </span>
                    {/* 좋아요 수 표시 */}
                    <span className={`text-[0.75rem]`}>1100</span>
                </div>
            </div>
        </>
    )
}

