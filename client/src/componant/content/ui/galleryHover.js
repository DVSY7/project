//src/componant/content/utilities/galleryHover.js

import { useState } from "react";
import ProfileModal from "../../community/ui/profileModal";

export default function GalleryHover(props) {
    
    const [clicked, setClicked] = useState(false);

    const {title,date,likes,views,profile_image, location, setClickedGallery, index} = props;

    // 갤러리 데이터를 가져오기 위한 props
    const {id, setGalleryImage, fetchGalleryImage} = props;

    // 프로필 모달을 띄우기 위한 props
    const {username, setClickedProfile} = props;

    const dateOnly =new Date(date).toISOString().split('T')[0]; // 날짜를 YYYY-MM-DD 형식으로 변환

    // 도구를 관리하기 위한 객체
    const tools = {
        type : ['휴지통','연필','위치'],
        func : {
            'delete': ()=>{console.log("isDelete")},
            'update': ()=>{console.log("isUpdate")},
            'local' : ()=>{setClickedLocation((prev) => !prev);}
        }
    }

    // 위치표시 상태관리
    const [clickedLocation, setClickedLocation] = useState(false);

    return (
        <>
            {/* 갤러리 호버 헤더 */}
            <div className={`flex flex-col h-[25%]`}>
                {/* 날짜와 비공개 설정 영역 */}
                <div className={`flex justify-between items-center font-sans mt-2 `}>
                    {/* 날짜 표기 영역 */}
                    <div className={`text-[1rem] ml-4`}>{dateOnly}</div>
                    {/* 비공개설정 UI 영역 */}
                    <div className={`w-[40px] h-[13px] bg-gray-50 rounded-2xl mr-4 `}><div onClick={() => setClicked(clicked ? false : true)} className={`${clicked ? "translate-x-[63%] clicked-before" : ""} translate-y-[-50%] transition-transform duration-500 w-full h-full galleryhover-before`}></div></div>
                </div>
                {/* 도구탭 영역 */}
                <div className={`flex justify-between `}>
                    {/* 도구 이미지 영역 */}
                    <div className={`flex ml-4 mt-1`}>
                        {tools.type.map((type, index) => {
                            const keys = Object.keys(tools.func);
                            const funcKey = keys[index];
                            // tools 객체에서 해당하는 key의 함수를 가져옴옴
                            const handleClick = tools.func[funcKey];

                            return (<img
                                key={index} 
                                onClick={()=>{
                                    // 도구 클릭 시 실행되는 함수
                                    handleClick();  
                                }} alt={`${type}`} 
                                className={`w-[20px] h-[20px] mr-3`} 
                                src={`/images/${type}.png`}>
                                </img>
                                )
                        })}
                        
                    </div>
                    {/* 비공개 글자 영역 */}
                    <div className={`mr-4 text-[0.75rem]`}>{clicked ? "공개" : "비공개"}</div>
                </div>
                {/* 위치정보 표시영역 */}
                {clickedLocation && 
                <div className={`ml-5 font-sans`}>{location}</div>}
            </div>


            {/* 갤러리 호버 컨텐츠 */}
            <div
            data-key={index}
            // 갤러리 클릭 이벤트
            onClick={async () => {
                setClickedGallery(index); 
                const imageData = await fetchGalleryImage(id);
                setGalleryImage(imageData);
            }} 
            className={` flex justify-center items-center w-full h-[50%] text-[1.5rem] px-4`}>
                <div>{title}</div>
            </div>
    

            {/* 갤러리 호버 풋터 */}
            <div className={` h-[25%] w-full flex justify-between items-end pb-2`}>
                {/* 갤러리 프로필 이미지 영역 */}
                <div className={`w-[42px] h-[42px] ml-3 mb-1`}>
                    <img
                    className={`w-[42px] h-[42px] rounded-[50%]`} 
                    onClick={()=>{setClickedProfile((prev) => ({...prev,[id]: true}))}}
                    alt="미니프로필" src={`${profile_image}`}></img>
                </div>
               
                {/* 조회수 좋아요 표시 영역 */}
                <div className={`flex mx-4 font-sans`}>
                    {/* 눈 이미지 영역 */}
                    <span>
                        {/* 눈 이미지 요소*/}
                        <img
                        alt="눈" 
                        src="/images/눈.png"
                        className={`w-[20px] h-[20px] mr-2`}
                        ></img>
                    </span>
                    {/* 조회수 표시 */}
                    <span className={`mr-2 text-[0.75rem]`}>{views}</span>
                    {/* 하트 이미지 영역 */}
                    <span className={`flex justify-center items-center mr-2`}>
                        {/* 하트 이미지 요소 */}
                        <img 
                        alt="하트"
                        src="/images/하트.png"
                        className={`w-[15px] h-[15px]`}
                        ></img>
                    </span>
                    {/* 좋아요 수 표시 */}
                    <span className={`text-[0.75rem]`}>{likes}</span>
                </div>
            </div>
        </>
    )
}

