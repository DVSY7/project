//client/src/componant/profile/bucketlist.js
import {useState,useEffect} from "react";
import FilterModal from "./ui/filterModal";
import bookmark from "./utilities/bookmark";
import JoinMessage from "./ui/joinMessage";

export default function BucketList(){

    // 필터링 모달창 상태관리 스테이트
    const [filter, setFilter] = useState(false);
    // 선택된 옵션 상태관리 스테이트
    const [filterOptions, setFilterOptions] = useState({
        option1: "대면",
        option2: "같이하기",
        option3: "계획성",
        option4: "인원",
        option5: "테마",
        option6: "정렬",
    })
    

    useEffect(() => {
        console.log(filterOptions);
    },[filterOptions])


    const profiles = [
        {
            img : "/images/미니프로필.png",
            title : "나만의 케이크 만들기",
            close : "2025.08.09",
            currentMember : "1",
            maxMember : "5",
            interests : "요리",
            bookmark : true,
        },
        {
            img : "/images/미니프로필.png",
            title : "서핑배우기",
            close : "2025.08.09",
            currentMember : "4",
            maxMember : "10",
            interests : "요리",
            bookmark : false,
        },
        {
            img : "/images/미니프로필.png",
            title : "한국사 시험 합격하기",
            close : "2025.08.09",
            currentMember : "1",
            maxMember : "2",
            interests : "요리",
            bookmark : false,
        },
        {
            img : "/images/미니프로필.png",
            title : "히말라야 등산하기",
            close : "2025.08.09",
            currentMember : "3",
            maxMember : "8",
            interests : "요리",
            bookmark : true,
        },
        {
            img : "/images/미니프로필.png",
            title : "바다낚시 하러가기",
            close : "2025.08.09",
            currentMember : "2",
            maxMember : "6",
            interests : "요리",
            bookmark : true,
        },
    ]

    // 북마크 상태관리 스테이트
    const [clickedBookmark, setClickedBookmark] = useState(
        profiles.map(profile => profile.bookmark)
      );

    // 참여하기 버튼 메세지 상태관리 스테이트
    const [clickedJoin, setClickedJoin] = useState(
        profiles.map(() => false)
    )
    

    return(
        <>
            <div className={` w-[80%] h-[95%]  rounded-3xl shadow-xl border border-solid border-t-gray-200`}>
                <div className={`flex justify-between h-[15%]`}>
                    <div className={`flex items-center h-full text-[1.5rem] ml-6`}>리스트</div>
                    <div onClick={()=>setFilter(prev => !prev)} className={`mt-3 mr-8 cursor-pointer relative ${filter? "opacity-100":" opacity-30"} text-[0.8rem] transition-opacity duration-300`}>필터<span className={`ml-1 text-[0.75rem]`}>●</span>{filter&&<FilterModal setFilter={setFilter} filterOptions={filterOptions} setFilterOptions={setFilterOptions}/>}</div>
                </div>
                <div 
                className={`h-[85%] overflow-y-auto`}>


                    {/* 프로필 불러오기(반복문) */}
                    {profiles.map((profile,key) => (
                        <div key={profile.title} className={`flex w-[90%] h-[25%] border-b border-b-gray-200 ml-6`}>
                            <div className={`2xl:flex justify-center items-end w-[15%] h-full hidden`}><img src={profile.img} alt="프로필" className={`mb-1`}></img></div>
                            <div className={`flex flex-col justify-end w-[65%] h-full`}>
                                <div className={`font-bold ml-4`}>{profile.title}</div>
                                <div className={`font-sans opacity-50 ml-6 mb-1`}>~ {profile.close}</div>
                            </div>
                            <div className={`flex flex-col justify-between w-[25%]`}>
                                <div className={`flex justify-between`}>
                                    <span className={`flex justify-center items-center text-[0.7rem] rounded-lg bg-orange-100 w-10 h-4 mt-3`}>{profile.interests}</span>

                                    {/* 북마크 영역 */}
                                    <img
                                    onClick={() => bookmark(key, clickedBookmark, setClickedBookmark)}
                                    className="w-5 h-5 mt-3"
                                    src={clickedBookmark[key] ? "/images/북마크1.png" : "/images/북마크2.png"}
                                    alt="북마크"
                                    />


                                </div>
                                <div className={`grid grid-cols-2 font-sans font-bold`}>
                                    <div className={`col-start-1`}><div><span>{profile.currentMember}</span>/<span>{profile.maxMember}</span></div></div>
                                    <div className={'col-start-2 flex'}>
                                        <span 
                                            className={`flex justify-end text-blue-400 w-full`}
                                            onClick={()=>{
                                                const updateClicked = [...clickedJoin];
                                                updateClicked[key] = true;
                                                setClickedJoin(updateClicked);      
                                            }}
                                            >
                                            {/* 참여버튼 요소 */}
                                            참여
                                            {/* 버튼클릭 모달 */}
                                            <JoinMessage 
                                            img = {profile.img}
                                            title = {profile.title} 
                                            clickedJoin = {clickedJoin} 
                                            index = {key}
                                            currentMember = {profile.currentMember}
                                            maxMember = {profile.maxMember}
                                            setClickedJoin = {setClickedJoin}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </>
    )
}