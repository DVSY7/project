//client/src/componant/profile/bucketlist.js
import {useState,useEffect} from "react";
import FilterModal from "./ui/filterModal";
import JoinMessage from "./ui/joinMessage";
import {useLocation} from "react-router-dom";
import { bookmarkChange, fetchListInfo } from "./api/List";
import { changeInterestColor } from "./utilities/interestColor";

export default function BucketList(props){
    // 부모 컴포넌트 전달 값
    const {clickedBookmark, setClickedBookmark, currentUserID} = props;
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
    // url에 있는 유저 정보
    const location = useLocation();
    // 유저의 아이디를 가져옴
    const searchParams = new URLSearchParams(location.search);
    const urlUserID = searchParams.get("userID");
    // 리스트 정보 상태관리
    const [listInfo, setListInfo] = useState([]);

    useEffect(()=>{
        
        if(urlUserID && currentUserID[0].id !== 0){
            const getListInfo = async()=>{
                try{
                    const res = await fetchListInfo(urlUserID,currentUserID[0].id);
                    console.log("정보확인:",res);
                    return setListInfo(res);
                }catch(error){
                    console.log("리스트 정보 불러오기 실패 : ", error);
                    return;
                }
            }
            getListInfo();
        }
    },[currentUserID,location,clickedBookmark]);
    

    useEffect(() => {
        console.log(filterOptions);
    },[filterOptions,listInfo])

    // 참여하기 버튼 메세지 상태관리 스테이트
    const [clickedJoin, setClickedJoin] = useState(
        listInfo.map(() => false)
    )

    // bookmark 변경 함수
    const handleChangeBookmark = async (listID, isBookmark) =>{
        const res = await bookmarkChange(listID,currentUserID[0].id,!isBookmark);
        setClickedBookmark(res);
        return;
    }

    return(
        <>
            <div className={` w-[80%] h-[95%] rounded-3xl shadow-xl border border-solid border-t-gray-200`}>
                <div className={`flex justify-between h-[15%] border-b-[1px]`}>
                    <div className={`flex items-center h-full text-[1.5rem] ml-6`}>리스트</div>
                    <div onClick={()=>setFilter(prev => !prev)} className={`mt-3 mr-8 cursor-pointer relative ${filter? "opacity-100":" opacity-30"} text-[0.8rem] transition-opacity duration-300`}>필터<span className={`ml-1 text-[0.75rem]`}>●</span>{filter&&<FilterModal setFilter={setFilter} filterOptions={filterOptions} setFilterOptions={setFilterOptions}/>}</div>
                </div>
                <div 
                className={`h-[85%] overflow-y-auto hide-scrollbar`}>

                    {/* 리스트가 존재하지 않으면 */}
                    {listInfo.length === 0 && 
                    <div className={`bg-gray-50 w-full h-full flex justify-center items-center`}>리스트가 존재하지 않습니다.</div>}
                    {/* 프로필 불러오기(반복문) */}
                    {listInfo.map((listInfo,key) => {
                        const interest = listInfo.interest.split("&")[0].trim();
                        const interestColor = changeInterestColor(interest);
                        return(
                        <div key={`list-${listInfo.list_id}`} className={`flex w-[90%] h-[25%] border-b border-b-gray-200 ml-6`}>
                            <div className={`2xl:flex justify-center items-end w-[15%] h-full hidden`}><img src={listInfo.profile_image} alt="프로필" className={`mb-2 w-[55px] h-[55px] rounded-[50%]`}></img></div>
                            <div className={`flex flex-col justify-end w-[65%] h-full`}>
                                <div className={`font-bold ml-4`}>{listInfo.title}</div>
                                <div className={`font-sans opacity-50 ml-6 mb-1`}>{listInfo.period_start_date} ~ {listInfo.period_end_date}</div>
                            </div>
                            <div className={`flex flex-col justify-end w-[25%]`}>
                                <div className={`flex justify-between`}>
                                    <span className={`flex justify-center items-center text-[0.7rem] rounded-lg ${interestColor} h-4 px-2 py-2 mt-1`}>{listInfo.interest.split("&")[0]}</span>

                                    {/* 북마크 영역 */}
                                    <img
                                    onClick={() => {
                                        handleChangeBookmark(listInfo.list_id, listInfo.is_bookmark); 
                                        }}
                                    className="w-5 h-5 mb-1 mt-1 cursor-pointer"
                                    src={listInfo.is_bookmark ? "/images/북마크1.png" : "/images/북마크2.png"}
                                    alt="북마크"
                                    />


                                </div>
                                <div className={`grid grid-cols-2 font-sans font-bold text-[0.9rem]`}>
                                    <div className={`col-start-1 ml-1`}><div><span>{listInfo.current_members}</span>/<span>{listInfo.max_members}</span></div></div>
                                    <div className={'col-start-2 flex'}>
                                        <span 
                                            className={`flex justify-end text-blue-300 w-full cursor-pointer text-[0.8rem] hover:text-blue-500`}
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
                                            img = {listInfo.profile_image}
                                            title = {listInfo.title}
                                            userID = {currentUserID[0].id}
                                            listID = {listInfo.list_id}
                                            clickedJoin = {clickedJoin} 
                                            index = {key}
                                            currentMember = {listInfo.current_members}
                                            maxMember = {listInfo.max_members}
                                            setClickedJoin = {setClickedJoin}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}


                </div>
            </div>
        </>
    )
}