//src/componant/content/utilities/galleryHover.js

import { useState,useEffect } from "react";
import { fetchLikes, likesHandler } from "../api/likes";
import { updateViews } from "../api/views";

export default function GalleryHover(props) {    
    const {title,date,likes,isliked,views,profile_image, location,clickedGallery, setClickedGallery, index} = props;

    // 갤러리 데이터를 가져오기 위한 props
    const {id,galleryID,userID, setGalleryImage, fetchGalleryImage} = props;

    // 프로필 모달을 띄우기 위한 props
    const {username, setClickedProfile} = props;

    // 갤러리 데이터를 갤러리 뷰에 전달하기위한 props
    const {setGalleryInfo} = props;

    // 공개 / 비공개 설정  상태관리 스테이트
    const [clicked, setClicked] = useState(false);
    // 좋아요 토글 관리 스테이트
    const [clickedLike, setClickedLike] = useState(isliked[index]);
    // 좋아요 수 증가 스테이트
    const [likeCounts, setLikeCounts] = useState(likes);
    // 위치표시 상태관리
    const [clickedLocation, setClickedLocation] = useState(false);
    // 조회수 증가 스테이트
    const [currentViews, setCurrentViews] = useState(views);

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

    // 조회수, 좋아요 관리를 위한 객체
    const engagementManager = { 
        func: {
            // 좋아요 로직
            "좋아요":async ()=>{
                setClickedLike(prev => !prev);
                // 좋아요 취소처리
                if(clickedLike){
                    // 데이터베이스에 좋아요 반영
                    await likesHandler("decrease",galleryID,userID);
                }
                // 현재 UI에 좋아요 수 반영
                const updatedLikes = await fetchLikes(galleryID);
                setLikeCounts(updatedLikes);
            },
            // 조회수 로직
            "조회":async()=>{console.log("조회수 동작")
                const koreaTimeStr = new Date().toLocaleString("sv-SE",{
                    timeZone: "Asia/Seoul",
                });
                const toDayDate = koreaTimeStr.split(" ")[0];

                console.log(`한국 시간: ${toDayDate}`);
                const resViews = await updateViews(galleryID, userID, toDayDate);
                setCurrentViews(resViews);
            }
        }
    }

    // 검색조건 입력 시 좋아요 토글 최신상태로 반영
    useEffect(()=>{
        setClickedLike(isliked[index]);
    }, [isliked, index]);

    useEffect(()=>{
        setGalleryInfo({views,likes});
    },[])

    // 조회수, 좋아요, 갤러리 클릭 변화 시 데이터 반영
    useEffect(()=>{
        setGalleryInfo({views:currentViews, likes:likeCounts});
        console.log({likes,views});
    },[currentViews, likeCounts, clickedGallery]);

    return (
        <> 
            {/* 갤러리 호버 헤더 */}
            <div
            className={`flex flex-col h-[25%]`}>
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
                            // tools 객체에서 해당하는 key의 함수를 가져옴
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
            data-value={"조회"}
            // 갤러리 클릭 이벤트
            onClick={async (e) => {
                    setClickedGallery(index); 
                    const imageData = await fetchGalleryImage(galleryID);
                    setGalleryImage(imageData);
                    return engagementManager.func[e.target.dataset.value]();
            }} 
            className={` flex justify-center items-center w-full h-[50%] text-[1.5rem] px-4 cursor-pointer`}>
                <div className={`pointer-events-none`}>{title}</div>
            </div>
    

            {/* 갤러리 호버 풋터 */}
            <div className={` h-[25%] w-full flex justify-between items-end pb-2`}>
                {/* 갤러리 프로필 이미지 영역 */}
                <div className={`w-[42px] h-[42px] ml-3 mb-1`}>
                    <img
                    className={`w-[42px] h-[42px] rounded-[50%] cursor-pointer`} 
                    onClick={()=>{setClickedProfile((prev) => { console.log(prev); return({...prev,[id]: true})})}}
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
                    <span className={`mr-2 text-[0.75rem]`}>{currentViews}</span>
                    {/* 하트 이미지 영역 */}
                    <span className={`flex justify-center items-center mr-2`}>
                        {/* 하트 이미지 요소 */}
                        <img
                        // 좋아요 수 증가처리
                        onClick={async (e)=>{
                            if(!clickedLike){
                                // 데이터베이스에 좋아요 반영
                                await likesHandler("increase",galleryID,userID);
                            }
                            // 현재 UI에 좋아요 수를 반영
                            const updatedLikes = await fetchLikes(galleryID);
                            setLikeCounts(updatedLikes); 

                            return(engagementManager.func[e.target.dataset.value]())
                        }} 
                        data-value="좋아요"
                        alt="하트"
                        src={`/images/${clickedLike?"하트1":"하트2"}.png`}
                        className={`w-[15px] h-[15px] cursor-pointer`}
                        ></img>
                    </span>
                    {/* 좋아요 수 표시 */}
                    <span className={`text-[0.75rem]`}>{likeCounts}</span>
                </div>
            </div>
        </>
    )
}

